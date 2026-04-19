// // ============================================================
// //  src/app/(pages)/home/page.tsx
// //  Server component — fetches all entities, passes to
// //  RecommendedSection which handles AI + favorites ranking.
// // ============================================================
// import RecommendedSection, { RecommendedItem } from "@/components/Recommendations/RecommendedSection";
// import HomeFavoritesWrapper from "@/components/Recommendations/HomeFavoritesWrapper";
// import { HotelI, LandmarkI, RestaurantI, ProgramI } from "@/interfaces";

// const API = "http://egyptvoyage.runasp.net/api";

// async function safeFetch<T>(url: string): Promise<T[]> {
//     try {
//         const res = await fetch(url, { cache: "no-store" });
//         if (!res.ok) return [];
//         return res.json();
//     } catch { return []; }
// }

// export default async function Home() {
//     const [hotels, landmarks, restaurants, programs] = await Promise.all([
//         safeFetch<HotelI>(`${API}/Hotels`),
//         safeFetch<LandmarkI>(`${API}/Landmarks`),
//         safeFetch<RestaurantI>(`${API}/Restaurants`),
//         safeFetch<ProgramI>(`${API}/Programs`),
//     ]);

//     const hotelItems: RecommendedItem[] = hotels.map((h) => ({
//         id: h.id, name: h.hotelName, city: h.location?.city,
//         imageCover: h.imageCover, href: `/hotel/${h.id}`, badge: "Hotel",
//     }));
//     const landmarkItems: RecommendedItem[] = landmarks.map((l) => ({
//         id: l.id, name: l.landmarkName, city: l.location?.city,
//         imageCover: l.imageCover, href: `/landmark/${l.id}`, badge: "Landmark",
//     }));
//     const restaurantItems: RecommendedItem[] = restaurants.map((r) => ({
//         id: r.id, name: r.restaurantName, city: r.location?.city,
//         imageCover: r.imageCover, href: `/restaurant/${r.id}`, badge: "Restaurant",
//     }));
//     const programItems: RecommendedItem[] = programs.map((p) => ({
//         id: p.id, name: p.name, city: p.country,
//         imageCover: p.imageCover, href: `/program/${p.id}`, badge: "Program",
//     }));

//     // HomeFavoritesWrapper is a client component that reads FavoriteContext
//     // and passes the right favoriteIds to each RecommendedSection
//     return (
//         <main className="min-h-screen">
//             <HomeFavoritesWrapper
//                 hotelItems={hotelItems}
//                 landmarkItems={landmarkItems}
//                 restaurantItems={restaurantItems}
//                 programItems={programItems}
//             />
//         </main>
//     );
// }







// src/app/(pages)/home/page.tsx
import HomeFavoritesWrapper from "@/components/Recommendations/HomeFavoritesWrapper";
import { RecommendedItem } from "@/components/Recommendations/RecommendedSection";
import { HotelI, LandmarkI, RestaurantI, ProgramI } from "@/interfaces";

const API = "http://egyptvoyage.runasp.net/api";

async function safeFetch<T>(url: string): Promise<T[]> {
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch { return []; }
}

export default async function Home() {
    const [hotels, landmarks, restaurants, programs] = await Promise.all([
        safeFetch<HotelI>(`${API}/Hotels`),
        safeFetch<LandmarkI>(`${API}/Landmarks`),
        safeFetch<RestaurantI>(`${API}/Restaurants`),
        safeFetch<ProgramI>(`${API}/Programs`),
    ]);

    const hotelItems: RecommendedItem[] = hotels.map((h) => ({
        id: h.id, name: h.hotelName, city: h.location?.city,
        imageCover: h.imageCover, href: `/hotel/${h.id}`,
        badge: "Hotel", entityType: "hotel",
    }));
    const landmarkItems: RecommendedItem[] = landmarks.map((l) => ({
        id: l.id, name: l.landmarkName, city: l.location?.city,
        imageCover: l.imageCover, href: `/landmark/${l.id}`,
        badge: "Landmark", entityType: "landmark",
    }));
    const restaurantItems: RecommendedItem[] = restaurants.map((r) => ({
        id: r.id, name: r.restaurantName, city: r.location?.city,
        imageCover: r.imageCover, href: `/restaurant/${r.id}`,
        badge: "Restaurant", entityType: "restaurant",
    }));
    const programItems: RecommendedItem[] = programs.map((p) => ({
        id: p.id, name: p.name, country: p.country,
        imageCover: p.imageCover, href: `/program/${p.id}`,
        badge: "Program", entityType: "program",
    }));

    return (
        <main className="min-h-screen">
            <HomeFavoritesWrapper
                hotelItems={hotelItems}
                landmarkItems={landmarkItems}
                restaurantItems={restaurantItems}
                programItems={programItems}
            />
        </main>
    );
}
