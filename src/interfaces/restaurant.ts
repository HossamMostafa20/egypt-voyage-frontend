import { LocationI } from "./location"

export interface RestaurantI {
    id: string
    restaurantName: string
    openingHour: string
    closingHour: string
    images: string[]
    imageCover: string
    cuisineType: string
    location: LocationI
    rating: number
}
