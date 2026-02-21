import { LocationI } from "./location"

export interface LandmarkI {
    id: string
    landmarkName: string
    openingHour: string
    closingHour: string
    images: string[]
    imageCover: string
    description: string
    location: LocationI
    price: number
    rating: number
}
