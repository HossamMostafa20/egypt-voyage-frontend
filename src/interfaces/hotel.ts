import { LocationI } from "./location"

export interface HotelI {
    id: string
    hotelName: string
    websiteLink: string
    level: number
    description: string
    location: LocationI
    images: string[]
    imageCover: string
}
