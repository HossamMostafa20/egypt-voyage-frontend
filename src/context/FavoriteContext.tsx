// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { FavoriteList, FavoriteType } from "@/interfaces/FavoriteList";

// const BASE_URL = "http://egyptvoyage.runasp.net";

// interface FavoriteContextType {
//     list: FavoriteList | null;
//     isInFavorites: (itemId: string, type: FavoriteType) => boolean;
//     toggleFavorite: (itemId: string, type: FavoriteType) => Promise<void>;
// }

// const FavoriteContext = createContext<FavoriteContextType | null>(null);

// export function FavoriteProvider({ children }: { children: React.ReactNode }) {
//     const [list, setList] = useState<FavoriteList | null>(null);

//     // 🟢 تحميل المفضلة أول ما المستخدم يدخل
//     useEffect(() => {
//         const fetchFavorites = async () => {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             const res = await fetch(
//                 "http://egyptvoyage.runasp.net/api/FavoriteLists/my",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Token:", token);

//             console.log("Status:", res.status);

//             if (!res.ok) {
//                 throw new Error("Request failed");
//             }

//             const data = await res.json();
//         };

//         fetchFavorites();
//     }, []);

//     // 🟢 نحدد اسم الحقل حسب النوع
//     const getField = (type: FavoriteType) => {
//         const map = {
//             hotel: "hotelIds",
//             restaurant: "restaurantIds",
//             landmark: "landmarkIds",
//             program: "programIds",
//         } as const;

//         return map[type];
//     };

//     // 🟢 هل العنصر موجود؟
//     const isInFavorites = (itemId: string, type: FavoriteType) => {
//         if (!list) return false;
//         const field = getField(type);
//         return list[field]?.includes(itemId);
//     };

//     // 🟢 Toggle (Optimistic Update)
//     const toggleFavorite = async (itemId: string, type: FavoriteType) => {
//         if (!list) return;

//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const field = getField(type);
//         const exists = list[field].includes(itemId);

//         // 🟡 Optimistic Update
//         const updatedList: FavoriteList = {
//             ...list,
//             [field]: exists
//                 ? list[field].filter((id) => id !== itemId)
//                 : [...list[field], itemId],
//         };

//         setList(updatedList); // يحدث UI فورًا ❤️

//         try {
//             await fetch(`${BASE_URL}/api/FavoriteLists/${list.id}`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(updatedList),
//             });
//         } catch (error) {
//             console.error("Failed to update favorites", error);
//             setList(list); // rollback لو فشل
//         }
//     };

//     return (
//         <FavoriteContext.Provider
//             value={{ list, isInFavorites, toggleFavorite }}
//         >
//             {children}
//         </FavoriteContext.Provider>
//     );
// }

// export function useFavorites() {
//     const context = useContext(FavoriteContext);
//     if (!context) {
//         throw new Error("useFavorites must be used inside FavoriteProvider");
//     }
//     return context;
// }
