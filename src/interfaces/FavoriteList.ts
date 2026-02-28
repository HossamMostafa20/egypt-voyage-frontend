
export type EntityType = "hotel" | "restaurant" | "landmark" | "program";

export interface Location {
    city: string;
    address: string;
}

/* ================= Hotels ================= */
export interface HotelT {
    id: string;
    hotelName: string;
    websiteLink: string;
    level: number;
    description: string;
    location: Location;
    images: string[];
    imageCover: string;
}

/* ================= Restaurants ================= */
export interface RestaurantT {
    id: string;
    restaurantName: string;
    openingHour: string;
    closingHour: string;
    images: string[];
    imageCover: string;
    cuisineType: string;
    location: Location;
    rating: number;
}

/* ================= Landmarks ================= */
export interface LandmarkT {
    id: string;
    landmarkName: string;
    openingHour: string;
    closingHour: string;
    images: string[];
    imageCover: string;
    description: string;
    location: Location;
    price: number;
    rating: number;
}

/* ================= Programs ================= */
export interface ProgramT {
    id: string;
    name: string;
    duration: string;
    price: number;
    description: string;
    country: string;
    images: string[];
    imageCover: string;
    link: string;
}

/* ================= Favorite Response ================= */
export interface FavoriteResponse {
    id: string;
    touristId: string;
    hotels: HotelT[];
    restaurants: RestaurantT[];
    landmarks: LandmarkT[];
    programs: ProgramT[];
}
