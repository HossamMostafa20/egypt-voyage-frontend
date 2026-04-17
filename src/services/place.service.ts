const BASE_URL = "http://egyptvoyage.runasp.net/api";

// Hotels
export async function getHotels() {
  const res = await fetch(`${BASE_URL}/Hotels`);
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}

// Landmarks
export async function getLandmarks() {
  const res = await fetch(`${BASE_URL}/Landmarks`);
  if (!res.ok) throw new Error("Failed to fetch landmarks");
  return res.json();
}

// Restaurants
export async function getRestaurants() {
  const res = await fetch(`${BASE_URL}/Restaurants`);
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  return res.json();
}

// Programs
export async function getPrograms() {
  const res = await fetch(`${BASE_URL}/Programs`);
  if (!res.ok) throw new Error("Failed to fetch programs");
  return res.json();
}
