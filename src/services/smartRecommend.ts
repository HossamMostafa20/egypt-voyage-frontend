// ============================================================
//  smartRecommend.ts
//  Pure client-side recommendation engine.
//  Works entirely from localStorage — no extra API calls.
//
//  Strategy (in priority order):
//  1. Items the user already interacted with → boosted score
//  2. Items in cities/countries the user likes → city bonus
//  3. Items of entity types the user prefers → type bonus
//  4. Favorited/reviewed items surface first
//  5. Everything else sorted by the above scores
// ============================================================

import { getUserInteractions, getUserPreferences, EntityMeta } from "./interactionStore";

export interface ScoredItem {
    id: string;
    name: string;
    city?: string;
    imageCover: string;
    href: string;
    badge?: string;
    // scoring metadata (used for badge display)
    interacted: boolean;
    cityMatch: boolean;
    score: number;
}

// ─── Score a single item for a user ─────────────────────────
function scoreItem<T extends { id: string; city?: string; country?: string; entityType?: string }>(
    item: T & ScoredItem,
    userId: string,
    topCities: string[],
    topEntityTypes: string[],
    interactions: Record<string, EntityMeta>
): number {
    let score = 0;

    // 1. Direct interaction score (views, favorites, reviews)
    const interaction = interactions[item.id];
    if (interaction) score += interaction.score * 2; // double weight for direct history

    // 2. City match bonus
    const itemCity = item.city || item.country || "";
    const cityRank = topCities.indexOf(itemCity);
    if (cityRank === 0) score += 4;       // top city
    else if (cityRank === 1) score += 2.5;
    else if (cityRank === 2) score += 1.5;

    // 3. Entity type preference bonus
    const typeRank = topEntityTypes.indexOf((item as any).entityType ?? "");
    if (typeRank === 0) score += 2;
    else if (typeRank === 1) score += 1;

    return score;
}

// ─── Main ranking function ───────────────────────────────────
export function smartRank<T extends {
    id: string;
    name: string;
    city?: string;
    country?: string;
    imageCover: string;
    href: string;
    badge?: string;
    entityType?: string;
}>(
    items: T[],
    userId: string | null,
    limit: number = 8
): (T & { interacted: boolean; cityMatch: boolean; score: number })[] {
    if (!userId) {
        // Not logged in → return first N unchanged
        return items.slice(0, limit).map((item) => ({
            ...item,
            interacted: false,
            cityMatch: false,
            score: 0,
        }));
    }

    const interactions = getUserInteractions(userId);
    const { topCities, topEntityTypes } = getUserPreferences(userId);
    const hasHistory = Object.keys(interactions).length > 0;

    const scored = items.map((item) => {
        const itemCity = item.city || item.country || "";
        const s = hasHistory
            ? scoreItem(item as any, userId, topCities, topEntityTypes, interactions)
            : 0;
        return {
            ...item,
            score: s,
            interacted: !!interactions[item.id],
            cityMatch: topCities.includes(itemCity),
        };
    });

    // Sort: higher score first, then stable original order
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit);
}

// ─── Check if we have enough history to show personalized results ─
export function hasPersonalizationData(userId: string | null): boolean {
    if (!userId) return false;
    const interactions = getUserInteractions(userId);
    return Object.keys(interactions).length >= 1;
}
