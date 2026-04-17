import { PlaceItem } from "@/interfaces/place";
import { predictRecommendation } from "./recommendation.service";

export async function addPredictionsToPlaces(places: PlaceItem[], interactionType: string = "view"): Promise<PlaceItem[]> {
  const placesWithPredictions = await Promise.all(
    places.map(async (place) => {
      try {
        const result = await predictRecommendation({ entityId: place.id, interactionType, });

        return { ...place, prediction: result.prediction, };
      } catch {
        return { ...place, prediction: 0, };
      }
    })
  );
  return placesWithPredictions;
}
