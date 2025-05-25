"use server";

import { searchFlights, getAirportCode, type FlightOffer } from "@/lib/amadeus";
import { format } from "date-fns";

export type FlightSearchFormData = {
  country: string;
  startDate: Date;
  endDate: Date;
  transportation: "car" | "plane";
};

export type FlightSearchResult = {
  offers: FlightOffer[];
  error?: string;
};

export async function searchFlightOffers(
  data: FlightSearchFormData
): Promise<FlightSearchResult> {
  try {
    // For demo purposes, we'll use a fixed origin (you might want to make this configurable)
    const originLocationCode = "BEG"; // New York City

    // Get destination airport code from country name
    const destinationLocationCode = await getAirportCode(data.country);

    if (!destinationLocationCode) {
      return {
        offers: [],
        error: "Could not find airport code for the specified country",
      };
    }

    const offers = await searchFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate: format(data.startDate, "yyyy-MM-dd"),
      returnDate: format(data.endDate, "yyyy-MM-dd"),
      adults: 1,
    });

    return { offers };
  } catch (error) {
    console.error("Flight search error:", error);
    return {
      offers: [],
      error: "Failed to search flights. Please try again later.",
    };
  }
}
