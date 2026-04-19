// "use client";
// // ============================================================
// //  HomeFavoritesWrapper.tsx
// //  Client component — reads FavoriteContext and passes
// //  the correct favoriteIds to each RecommendedSection.
// //  This is needed because FavoriteContext is client-only,
// //  but home/page.tsx is a server component.
// // ============================================================
// import { useFavorites } from "@/context/FavoriteContext";
// import RecommendedSection, { RecommendedItem } from "./RecommendedSection";

// interface Props {
//     hotelItems: RecommendedItem[];
//     landmarkItems: RecommendedItem[];
//     restaurantItems: RecommendedItem[];
//     programItems: RecommendedItem[];
// }

// export default function HomeFavoritesWrapper({
//     hotelItems,
//     landmarkItems,
//     restaurantItems,
//     programItems,
// }: Props) {
//     const { favorites } = useFavorites();

//     return (
//         <>
//             {hotelItems.length > 0 && (
//                 <RecommendedSection
//                     items={hotelItems}
//                     favoriteIds={favorites.hotel}
//                     title="Hotels You Might Love"
//                     limit={6}
//                 />
//             )}
//             {landmarkItems.length > 0 && (
//                 <RecommendedSection
//                     items={landmarkItems}
//                     favoriteIds={favorites.landmark}
//                     title="Landmarks to Explore"
//                     limit={4}
//                 />
//             )}
//             {restaurantItems.length > 0 && (
//                 <RecommendedSection
//                     items={restaurantItems}
//                     favoriteIds={favorites.restaurant}
//                     title="Restaurants Near You"
//                     limit={4}
//                 />
//             )}
//             {programItems.length > 0 && (
//                 <RecommendedSection
//                     items={programItems}
//                     favoriteIds={favorites.program}
//                     title="Travel Programs"
//                     limit={4}
//                 />
//             )}
//         </>
//     );
// }








// "use client";
// // ============================================================
// //  HomeFavoritesWrapper.tsx
// //  Reads FavoriteContext (client-only) and passes favoriteIds
// //  to each RecommendedSection.
// // ============================================================
// import { useFavorites } from "@/context/FavoriteContext";
// import RecommendedSection, { RecommendedItem } from "./RecommendedSection";

// interface Props {
//     hotelItems: RecommendedItem[];
//     landmarkItems: RecommendedItem[];
//     restaurantItems: RecommendedItem[];
//     programItems: RecommendedItem[];
// }

// export default function HomeFavoritesWrapper({ hotelItems, landmarkItems, restaurantItems, programItems }: Props) {
//     const { favorites } = useFavorites();

//     return (
//         <>
//             {hotelItems.length > 0 && (
//                 <RecommendedSection
//                     items={hotelItems}
//                     favoriteIds={favorites.hotel}
//                     title="Hotels You Might Love"
//                     limit={8}
//                 />
//             )}
//             {landmarkItems.length > 0 && (
//                 <RecommendedSection
//                     items={landmarkItems}
//                     favoriteIds={favorites.landmark}
//                     title="Landmarks to Explore"
//                     limit={8}
//                 />
//             )}
//             {restaurantItems.length > 0 && (
//                 <RecommendedSection
//                     items={restaurantItems}
//                     favoriteIds={favorites.restaurant}
//                     title="Restaurants Near You"
//                     limit={8}
//                 />
//             )}
//             {programItems.length > 0 && (
//                 <RecommendedSection
//                     items={programItems}
//                     favoriteIds={favorites.program}
//                     title="Travel Programs"
//                     limit={8}
//                 />
//             )}
//         </>
//     );
// }








"use client";
// ============================================================
//  HomeFavoritesWrapper.tsx
//  Reads FavoriteContext and renders all home sections
//  including the new TrendingSection.
// ============================================================
import { useFavorites } from "@/context/FavoriteContext";
import RecommendedSection, { RecommendedItem } from "./RecommendedSection";
import TrendingSection, { TrendingItem } from "./TrendingSection";

interface Props {
    hotelItems: RecommendedItem[];
    landmarkItems: RecommendedItem[];
    restaurantItems: RecommendedItem[];
    programItems: RecommendedItem[];
}

export default function HomeFavoritesWrapper({
    hotelItems,
    landmarkItems,
    restaurantItems,
    programItems,
}: Props) {
    const { favorites } = useFavorites();

    // Combine ALL items into one list for TrendingSection
    // (trending IDs can be from any entity type)
    const allItems: TrendingItem[] = [
        ...hotelItems,
        ...landmarkItems,
        ...restaurantItems,
        ...programItems,
    ];

    return (
        <>
            {/* 🔥 Trending — comes FIRST for maximum visibility */}
            <TrendingSection allItems={allItems} limit={8} />

            {/* Personalised sections */}
            {hotelItems.length > 0 && (
                <RecommendedSection
                    items={hotelItems}
                    favoriteIds={favorites.hotel}
                    title="Hotels You Might Love"
                    limit={8}
                />
            )}
            {landmarkItems.length > 0 && (
                <RecommendedSection
                    items={landmarkItems}
                    favoriteIds={favorites.landmark}
                    title="Landmarks to Explore"
                    limit={8}
                />
            )}
            {restaurantItems.length > 0 && (
                <RecommendedSection
                    items={restaurantItems}
                    favoriteIds={favorites.restaurant}
                    title="Restaurants Near You"
                    limit={8}
                />
            )}
            {programItems.length > 0 && (
                <RecommendedSection
                    items={programItems}
                    favoriteIds={favorites.program}
                    title="Travel Programs"
                    limit={8}
                />
            )}
        </>
    );
}
