import { apiClient } from "@/lib/api-client";
import { formatDateToString } from "@/utils/format-date";

export async function getForecastData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_AI_URL}/api/forecast`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await res.json();
  return data;
}

export async function getPredictionForecastDashboard(
  forecastStart: Date,
  forecastEnd: Date
) {
  const formattedStart = formatDateToString(forecastStart);
  const formattedEnd = formatDateToString(forecastEnd);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_AI_URL}/prediction-dashboard?forecast_start_date=${formattedStart}&forecast_end_date=${formattedEnd}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await res.json();
  return data;
}

export async function getIngredientUsage(forecastStart: Date, forecastEnd: Date) {
  const formattedStart = formatDateToString(forecastStart);
  const formattedEnd = formatDateToString(forecastEnd);

  const res = apiClient(`/api/analytics/ingredient-usage?startDate=${formattedStart}&endDate=${formattedEnd}`, "GET");
  return res;
}