import { PredictionRequestI, PredictionResponseI } from "@/interfaces/recommendation";

// const BASE_URL = "http://egyptvoyage.runasp.net/api";

export async function predictRecommendation(payload: PredictionRequestI): Promise<PredictionResponseI> {
  const token = localStorage.getItem("token");

  if (!token) { throw new Error("No token found"); }

  const response = await fetch('http://egyptvoyage.runasp.net/api/Recommendations/predict', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to predict recommendation score");
  }
  return response.json();
}
