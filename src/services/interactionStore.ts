// ============================================================
//  interactionStore.ts
//  Saves ALL user interactions locally (clicks, favorites,
//  reviews). This is the "memory" of the recommendation engine.
//  Shape stored per user in localStorage:
//  {
//    "userId": {
//      "entityId": { views: 3, favorited: true, reviewed: true, city: "Cairo", lastSeen: timestamp }
//    }
//  }
// ============================================================

export type InteractionType = "view" | "favorite" | "review";

export interface EntityMeta {
    name: string;
    city?: string;
    country?: string;
    entityType: "hotel" | "landmark" | "restaurant" | "program";
    badge?: string;
    imageCover: string;
    href: string;
    // interaction counts
    views: number;
    favorited: boolean;
    reviewed: boolean;
    score: number; // computed
    lastSeen: number; // timestamp
}

const STORE_KEY = "ev_interactions";

function getStore(): Record<string, Record<string, EntityMeta>> {
    try {
        const raw = localStorage.getItem(STORE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveStore(store: Record<string, Record<string, EntityMeta>>) {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch { /* storage full */ }
}

function computeScore(e: EntityMeta): number {
    // Weights: review=5, favorite=3, view=1 (diminishing returns after 3 views)
    const viewScore = Math.min(e.views, 3) * 1;
    const favScore = e.favorited ? 3 : 0;
    const revScore = e.reviewed ? 5 : 0;
    // Recency bonus: decay over 7 days
    const daysSince = (Date.now() - e.lastSeen) / (1000 * 60 * 60 * 24);
    const recency = Math.max(0, 1 - daysSince / 7);
    return (viewScore + favScore + revScore) * (1 + recency * 0.3);
}

// ─── Record an interaction ────────────────────────────────────
export function recordInteraction(
    userId: string,
    entityId: string,
    type: InteractionType,
    meta: Omit<EntityMeta, "views" | "favorited" | "reviewed" | "score" | "lastSeen">
) {
    if (typeof window === "undefined") return;
    const store = getStore();
    if (!store[userId]) store[userId] = {};

    const existing: EntityMeta = store[userId][entityId] ?? {
        ...meta,
        views: 0,
        favorited: false,
        reviewed: false,
        score: 0,
        lastSeen: Date.now(),
    };

    if (type === "view") existing.views += 1;
    if (type === "favorite") existing.favorited = true;
    if (type === "review") existing.reviewed = true;

    existing.lastSeen = Date.now();
    // update meta in case it changed
    existing.name = meta.name;
    existing.city = meta.city;
    existing.country = meta.country;
    existing.imageCover = meta.imageCover;
    existing.href = meta.href;
    existing.entityType = meta.entityType;
    existing.badge = meta.badge;

    existing.score = computeScore(existing);
    store[userId][entityId] = existing;
    saveStore(store);
}

// ─── Get user's interaction map ──────────────────────────────
export function getUserInteractions(userId: string): Record<string, EntityMeta> {
    if (typeof window === "undefined") return {};
    const store = getStore();
    return store[userId] ?? {};
}

// ─── Get score for a specific entity ─────────────────────────
export function getEntityScore(userId: string, entityId: string): number {
    const interactions = getUserInteractions(userId);
    return interactions[entityId]?.score ?? 0;
}

// ─── Get cities/countries the user has shown interest in ─────
export function getUserPreferences(userId: string): {
    topCities: string[];
    topEntityTypes: string[];
    interactedIds: Set<string>;
} {
    const interactions = getUserInteractions(userId);
    const entries = Object.values(interactions);

    // Count cities weighted by score
    const cityScores: Record<string, number> = {};
    const typeScores: Record<string, number> = {};

    for (const e of entries) {
        const city = e.city || e.country || "";
        if (city) cityScores[city] = (cityScores[city] ?? 0) + e.score;
        typeScores[e.entityType] = (typeScores[e.entityType] ?? 0) + e.score;
    }

    const topCities = Object.entries(cityScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([city]) => city);

    const topEntityTypes = Object.entries(typeScores)
        .sort((a, b) => b[1] - a[1])
        .map(([type]) => type);

    return {
        topCities,
        topEntityTypes,
        interactedIds: new Set(Object.keys(interactions)),
    };
}
