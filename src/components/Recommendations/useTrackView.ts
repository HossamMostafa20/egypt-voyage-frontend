// "use client";

// import { useEffect } from "react";
// import { trackInteraction } from "@/services/recommendation.service";

// /**
//  * Drop this hook into any detail page (hotel, landmark, restaurant, program).
//  * It fires a "view" interaction to the AI model once when the page mounts.
//  *
//  * Usage:
//  *   useTrackView(hotel.id);
//  */
// export function useTrackView(entityId: string) {
//     useEffect(() => {
//         if (!entityId) return;

//         const token =
//             typeof window !== "undefined" ? localStorage.getItem("token") : null;

//         if (!token) return;

//         // Fire and forget — don't block the page
//         trackInteraction(token, entityId, "view");
//     }, [entityId]);
// }





// "use client";
// // ============================================================
// //  useTrackView.ts
// //  Drop into any detail page — tracks "view" interaction once.
// //  Usage:  useTrackView(hotel.id);
// // ============================================================
// import { useEffect } from "react";
// import { trackInteraction } from "@/services/recommendation.service";

// export function useTrackView(entityId: string) {
//     useEffect(() => {
//         if (!entityId) return;
//         const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//         if (!token) return;
//         trackInteraction(token, entityId, "view");
//     }, [entityId]);
// }








"use client";
// ============================================================
//  useTrackView.ts
//  Tracks view interactions both:
//  1. Locally in localStorage (for smart ranking)
//  2. To the C# backend (for AI model)
//
//  Usage in any detail page:
//    useTrackView(hotel.id, {
//      name: hotel.hotelName,
//      city: hotel.location.city,
//      entityType: "hotel",
//      imageCover: hotel.imageCover,
//      href: `/hotel/${hotel.id}`,
//      badge: "Hotel",
//    });
// ============================================================
import { useEffect } from "react";
import { recordInteraction } from "@/services/interactionStore";
import { trackInteraction } from "@/services/recommendation.service";

interface TrackMeta {
    name: string;
    city?: string;
    country?: string;
    entityType: "hotel" | "landmark" | "restaurant" | "program";
    imageCover: string;
    href: string;
    badge?: string;
}

export function useTrackView(entityId: string, meta: TrackMeta) {
    useEffect(() => {
        if (!entityId || typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) return;

        // Decode userId from JWT
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.sub || payload.userId || payload.nameid || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            if (userId) {
                // 1. Save locally for smart ranking
                recordInteraction(userId, entityId, "view", meta);
            }
        } catch { /* token decode failed */ }

        // 2. Send to backend AI model (fire and forget)
        trackInteraction(token, entityId, "view");

    }, [entityId]);
}

// ─── Also export a function for tracking favorites ────────────
export function trackFavoriteLocally(entityId: string, meta: TrackMeta) {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub || payload.userId || payload.nameid || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (userId) recordInteraction(userId, entityId, "favorite", meta);
    } catch { }
}

// ─── Track review locally ────────────────────────────────────
export function trackReviewLocally(entityId: string, meta: TrackMeta) {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub || payload.userId || payload.nameid || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (userId) recordInteraction(userId, entityId, "review", meta);
    } catch { }
}
