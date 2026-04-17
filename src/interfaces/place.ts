export type PlaceType = "hotel" | "landmark" | "restaurant" | "program";

export interface PlaceItem {
    id: string;
    name: string;
    image?: string;
    location?: string;
    rating?: number | null;
    type: PlaceType;
    prediction?: number;
}
