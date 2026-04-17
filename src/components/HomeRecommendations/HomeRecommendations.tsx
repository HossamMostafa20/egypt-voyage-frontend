"use client";

import { useCallback, useEffect, useState } from "react";
import { PlaceItem } from "@/interfaces/place";
import { addPredictionsToPlaces } from "@/services/recommendation.helper";
import { getHotels, getLandmarks, getRestaurants, getPrograms, } from "@/services/place.service";
import Loading from "@/app/loading";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeRecommendations() {
  const [recommendedHotels, setRecommendedHotels] = useState<PlaceItem[]>([]);
  const [recommendedLandmarks, setRecommendedLandmarks] = useState<PlaceItem[]>([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<PlaceItem[]>([]);
  const [recommendedPrograms, setRecommendedPrograms] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);

      const [hotelsRes, landmarksRes, restaurantsRes, programsRes] =
        await Promise.all([getHotels(), getLandmarks(), getRestaurants(), getPrograms()]);

      const hotels: PlaceItem[] = hotelsRes.slice(0, 8).map((item: any) => ({
        id: String(item.id),
        name: item.hotelName,
        image: item.imageCover,
        location: item.location?.city,
        rating: item.level,
        type: "hotel",
      }));

      const landmarks: PlaceItem[] = landmarksRes.slice(0, 8).map((item: any) => ({
        id: String(item.id),
        name: item.landmarkName,
        image: item.imageCover,
        location: item.location?.city,
        rating: item.rating,
        type: "landmark",
      }));

      const restaurants: PlaceItem[] = restaurantsRes.slice(0, 8).map((item: any) => ({
        id: String(item.id),
        name: item.restaurantName,
        image: item.imageCover,
        location: item.location?.city,
        rating: item.rating,
        type: "restaurant",
      }));

      const programs: PlaceItem[] = programsRes.slice(0, 8).map((item: any) => ({
        id: String(item.id),
        name: item.name,
        image: item.imageCover,
        location: item.country,
        type: "program",
      }));

      // لو المستخدم مش عامل login -> اعرض أماكن عادية
      if (!loggedIn) {
        setRecommendedHotels(hotels.slice(0, 6));
        setRecommendedLandmarks(landmarks.slice(0, 6));
        setRecommendedRestaurants(restaurants.slice(0, 6));
        setRecommendedPrograms(programs.slice(0, 6));
        return;
      }

      // لو عامل login -> شغّل AI بـ interactionType = "view"
      const [hotelsPredicted, landmarksPredicted, restaurantsPredicted, programsPredicted] = await Promise.all([
        addPredictionsToPlaces(hotels, "view"),
        addPredictionsToPlaces(landmarks, "view"),
        addPredictionsToPlaces(restaurants, "view"),
        addPredictionsToPlaces(programs, "view"),
      ]);

      setRecommendedHotels(
        hotelsPredicted
          .sort((a, b) => (b.prediction ?? 0) - (a.prediction ?? 0))
          .slice(0, 6)
      );

      setRecommendedLandmarks(
        landmarksPredicted
          .sort((a, b) => (b.prediction ?? 0) - (a.prediction ?? 0))
          .slice(0, 6)
      );

      setRecommendedRestaurants(
        restaurantsPredicted
          .sort((a, b) => (b.prediction ?? 0) - (a.prediction ?? 0))
          .slice(0, 6)
      );

      setRecommendedPrograms(
        programsPredicted
          .sort((a, b) => (b.prediction ?? 0) - (a.prediction ?? 0))
          .slice(0, 6)
      );
    } catch (err) {
      setError("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);

  // refresh بعد favorite/review
  useEffect(() => {
    const handleRefresh = () => {
      loadRecommendations();
    };

    window.addEventListener("refresh-ai-recommendations", handleRefresh);

    return () => {
      window.removeEventListener("refresh-ai-recommendations", handleRefresh);
    };
  }, [loadRecommendations]);

  if (loading) {
    return <div className="py-10 text-center"><Loading /></div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">{error}</div>;
  }

  return <>
    <div className="container mx-auto p-5 space-y-10">
      {isLoggedIn && (
        <h2 className="text-center text-3xl font-bold text-[#0D3B66]">Recommended For You</h2>
      )}

      {!isLoggedIn && (
        <h2 className="text-center text-3xl font-bold text-[#0D3B66]">Popular Places</h2>
      )}

      <RecommendationSection title="Hotels" items={recommendedHotels} />
      <RecommendationSection title="Landmarks" items={recommendedLandmarks} />
      <RecommendationSection title="Restaurants" items={recommendedRestaurants} />
      <RecommendationSection title="Programs" items={recommendedPrograms} />
    </div>
  </>
}

function RecommendationSection({ title, items, }: { title: string; items: PlaceItem[]; }) {
  if (!items.length) return null;

  return <>
    <section>
      <button className="mb-5 text-2xl text-white font-bold bg-[#223552] rounded-xl p-1.5">{title}</button>
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border p-4 shadow-sm">
            <img src={item.image || "/placeholder.jpg"} alt={item.name} className="mb-4 h-48 w-full rounded-xl object-cover"/>
            <h4 className="text-lg font-semibold">{item.name}</h4>
            <p className="mt-1 text-sm text-gray-500">{item.location}</p>

            {item.rating !== undefined && (
              <p className="mt-2 text-sm">Rating: {item.rating}</p>
            )}

            {item.prediction !== undefined && (
              <p className="mt-1 text-sm">AI Score: {item.prediction.toFixed(2)}</p>
            )}
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.id} href={`/${item.type}/${item.id}`} className="block" >

            <Card key={item.id} className="pb-4 flex flex-col transform transition-all duration-500 hover:shadow-[0_0_13px_rgba(0,0,0,0.15)] hover:shadow-black rounded-xl overflow-hidden">

              <div className="relative w-full aspect-4/3">
                <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover rounded-t-xl" />
              </div>

              <CardHeader className="flex-1">
                <CardTitle className="mt-2.5">
                  {item.name.split(" ").slice(0, 4).join(" ")}
                </CardTitle>

                <CardContent className="flex items-center justify-between mt-3">
                  <p className="text-md text-[#F8DA9A]">{item.location}</p>
                  {item.rating !== undefined && (
                    <p className="flex items-center gap-1.5 text-md text-yellow-300">({item.rating}) <StarIcon className="fill-yellow-300" /></p>
                  )}
                </CardContent>

                {/* {item.prediction !== undefined && (
                <CardDescription className="mt-2.5 mb-1.5 line-clamp-2">
                  AI Score: {item.prediction.toFixed(2)}
                </CardDescription>
              )} */}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  </>
}
