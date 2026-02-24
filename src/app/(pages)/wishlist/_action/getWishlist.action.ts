
// const BASE_URL = "https://egyptvoyage.runasp.net";

// export async function getFavoritesAction() {
//   const token = localStorage.getItem("token");

//   const response = await fetch(
//     "http://egyptvoyage.runasp.net/api/FavoriteLists/my",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (response.status === 404) {
//   return {
//     id: null,
//     hotelIds: [],
//     restaurantIds: [],
//     landmarkIds: [],
//     programIds: [],
//   };
// }

//   const text = await response.text();

//   if (!text) return []; // 👈 مهم جدًا

//   const data = JSON.parse(text);

//   // لو رجع error object
//   if (!Array.isArray(data)) return [];

//   return data;
// }
