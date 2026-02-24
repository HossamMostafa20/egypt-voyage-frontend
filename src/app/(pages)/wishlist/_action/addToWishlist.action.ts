// const BASE_URL = "https://egyptvoyage.runasp.net";

// export async function addToFavoriteAction(
//     list: any,
//     type: "hotel" | "restaurant" | "landmark" | "program",
//     itemId: string
// ) {
//     const token = localStorage.getItem("token");

//     const fieldMap = {
//         hotel: "hotelIds",
//         restaurant: "restaurantIds",
//         landmark: "landmarkIds",
//         program: "programIds",
//     };

//     const field = fieldMap[type];

//     const updatedList = {
//         ...list,
//         [field]: [...(list[field] || []), itemId],
//     };

//     const response = await fetch(
//         `${BASE_URL}/api/FavoriteLists/${list.id}`,
//         {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedList),
//         }
//     );

//     const data = await response.json();
//     return data
// }
