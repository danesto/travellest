// @ts-nocheck
import Amadeus from "amadeus";

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export type FlightSearchParams = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  currencyCode?: string;
};

export type FlightOffer = {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      carrierCode: string;
      number: string;
    }>;
  }>;
};

export async function searchFlights(params: FlightSearchParams) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: params.originLocationCode,
      destinationLocationCode: params.destinationLocationCode,
      departureDate: params.departureDate,
      returnDate: params.returnDate,
      adults: params.adults,
      currencyCode: params.currencyCode || "USD",
      max: 5, // Get top 5 cheapest flights
    });

    return response.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw new Error("Failed to search flights");
  }
}

// Helper function to get city/airport code from country name
export async function getAirportCode(countryName: string) {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: countryName,
      subType: "CITY,AIRPORT",
    });

    // Return the first result's IATA code
    return response.data[0]?.iataCode;
  } catch (error) {
    console.error("Error getting airport code:", error);
    throw new Error("Failed to get airport code");
  }
}
