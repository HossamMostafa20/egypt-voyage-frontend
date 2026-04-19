// import { PredictionRequestI, PredictionResponseI } from "@/interfaces/recommendation";

// // const BASE_URL = "http://egyptvoyage.runasp.net/api";

// export async function predictRecommendation(payload: PredictionRequestI): Promise<PredictionResponseI> {
//   const token = localStorage.getItem("token");

//   if (!token) { throw new Error("No token found"); }

//   const response = await fetch('http://egyptvoyage.runasp.net/api/Recommendations/predict', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "*/*",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to predict recommendation score");
//   }
//   return response.json();
// }



// // src/services/recommendation.service.ts
// // Calls the C# backend /api/recommendations endpoints

// const BASE_URL = "http://egyptvoyage.runasp.net/api";

// export interface RecommendationScore {
//     entity_id: string;
//     score: number;
// }

// export interface RecommendResponse {
//     recommendations: RecommendationScore[];
// }

// /**
//  * Get ranked recommendations for a list of entity IDs.
//  * The backend calls the Flask AI model and returns them sorted by score.
//  */
// export async function getRecommendations(
//     token: string,
//     entityIds: string[],
//     interactionType: "view" | "favorite" | "review" = "view",
//     topN?: number
// ): Promise<RecommendResponse> {
//     const body: Record<string, unknown> = {
//         entity_ids: entityIds,
//         interaction_type: interactionType,
//     };
//     if (topN) body.top_n = topN;

//     const res = await fetch(`${BASE_URL}/recommendations/recommend`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//         cache: "no-store",
//     });

//     if (!res.ok) {
//         throw new Error("Failed to get recommendations");
//     }

//     return res.json();
// }

// /**
//  * Track a single user interaction (view, favorite, review).
//  * Fire-and-forget — call this whenever the user visits a detail page.
//  */
// export async function trackInteraction(
//     token: string,
//     entityId: string,
//     interactionType: "view" | "favorite" | "review" = "view"
// ): Promise<void> {
//     try {
//         await fetch(`${BASE_URL}/recommendations/predict`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 entity_id: entityId,
//                 interaction_type: interactionType,
//             }),
//         });
//     } catch {
//         // Non-critical — swallow errors so the page still loads
//         console.warn("Failed to track interaction", entityId);
//     }
// }

// /**
//  * Sort any array of items by AI recommendation scores.
//  * Items with no score are placed at the end.
//  */
// export function sortByRecommendation<T extends { id: string }>(
//     items: T[],
//     recommendations: RecommendationScore[]
// ): T[] {
//     const scoreMap = new Map(recommendations.map((r) => [r.entity_id, r.score]));
//     return [...items].sort((a, b) => {
//         const scoreA = scoreMap.get(a.id) ?? -1;
//         const scoreB = scoreMap.get(b.id) ?? -1;
//         return scoreB - scoreA;
//     });
// }





// // ============================================================
// //  recommendation.service.ts
// //  Smart hybrid: AI model + favorites/reviews fallback
// // ============================================================

// const BASE_URL = "http://egyptvoyage.runasp.net/api";

// export interface RecommendationScore {
//     entity_id: string;
//     score: number;
// }

// export interface RecommendResponse {
//     recommendations: RecommendationScore[];
// }

// // ─── Get AI ranked recommendations ───────────────────────────
// export async function getRecommendations(
//     token: string,
//     entityIds: string[],
//     interactionType: "view" | "favorite" | "review" = "view",
//     topN?: number
// ): Promise<RecommendResponse> {
//     const body: Record<string, unknown> = { entityIds, interactionType };
//     if (topN) body.topN = topN;

//     const res = await fetch(`${BASE_URL}/Recommendations/recommend`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//         cache: "no-store",
//     });

//     if (!res.ok) throw new Error("Recommendations unavailable");
//     return res.json();
// }

// // ─── Track a single interaction (fire-and-forget) ────────────
// export async function trackInteraction(
//     token: string,
//     entityId: string,
//     interactionType: "view" | "favorite" | "review" = "view"
// ): Promise<void> {
//     try {
//         await fetch(`${BASE_URL}/Recommendations/predict`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ entityId, interactionType }),
//         });
//     } catch { /* non-critical */ }
// }

// // ─── Sort by AI scores ────────────────────────────────────────
// export function sortByRecommendation<T extends { id: string }>(
//     items: T[],
//     recommendations: RecommendationScore[]
// ): T[] {
//     const scoreMap = new Map(recommendations.map((r) => [r.entity_id, r.score]));
//     return [...items].sort((a, b) => {
//         const sA = scoreMap.get(a.id) ?? -1;
//         const sB = scoreMap.get(b.id) ?? -1;
//         return sB - sA;
//     });
// }

// // ─── Favorites-first sort (fallback for not-logged-in users) ─
// export function sortByFavoritesFirst<T extends { id: string }>(
//     items: T[],
//     favoriteIds: string[]
// ): T[] {
//     const favSet = new Set(favoriteIds);
//     return [...items].sort((a, b) => {
//         const aFav = favSet.has(a.id) ? 1 : 0;
//         const bFav = favSet.has(b.id) ? 1 : 0;
//         return bFav - aFav;
//     });
// }

// // ─── Check if AI scores are actually different from each other ─
// export function scoresAreMeaningful(recommendations: RecommendationScore[]): boolean {
//     if (recommendations.length < 2) return false;
//     const scores = recommendations.map((r) => r.score);
//     const min = Math.min(...scores);
//     const max = Math.max(...scores);
//     return (max - min) > 0.05;
// }






// ============================================================
//  recommendation.service.ts
//  Handles calls to C# /api/Recommendations endpoints.
// ============================================================

const BASE_URL = "http://egyptvoyage.runasp.net/api";

export interface RecommendationScore {
    entity_id: string;
    score: number;
}

export interface RecommendResponse {
    recommendations: RecommendationScore[];
}

export async function getRecommendations(
    token: string,
    entityIds: string[],
    interactionType: "view" | "favorite" | "review" = "view",
    topN?: number
): Promise<RecommendResponse> {
    const body: Record<string, unknown> = { entityIds, interactionType };
    if (topN) body.topN = topN;

    const res = await fetch(`${BASE_URL}/Recommendations/recommend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Recommendations unavailable");
    return res.json();
}

export async function trackInteraction(
    token: string,
    entityId: string,
    interactionType: "view" | "favorite" | "review" = "view"
): Promise<void> {
    try {
        await fetch(`${BASE_URL}/Recommendations/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ entityId, interactionType }),
        });
    } catch { }
}
