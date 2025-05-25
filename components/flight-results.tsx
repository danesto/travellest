"use client";

import { format } from "date-fns";
import { Plane, Clock, DollarSign } from "lucide-react";
import type { FlightOffer } from "@/lib/amadeus";

type FlightResultsProps = {
  offers: FlightOffer[];
  isLoading?: boolean;
  error?: string;
};

export function FlightResults({
  offers,
  isLoading,
  error,
}: FlightResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-32"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
        {error}
      </div>
    );
  }

  if (!offers.length) {
    return (
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-center">
        No flights found for your search criteria
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">
                {offer.itineraries[0].segments[0].carrierCode}{" "}
                {offer.itineraries[0].segments[0].number}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <DollarSign className="h-5 w-5" />
              <span className="font-bold text-lg">{offer.price.total}</span>
              <span className="text-sm text-gray-500">
                {offer.price.currency}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {offer.itineraries[0].segments.map((segment, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="space-y-1">
                  <div className="font-medium">
                    {format(new Date(segment.departure.at), "HH:mm")} -{" "}
                    {segment.departure.iataCode}
                  </div>
                  <div className="text-gray-500">
                    {format(new Date(segment.departure.at), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(
                      new Date(segment.arrival.at).getTime() -
                        new Date(segment.departure.at).getTime(),
                      "H:mm"
                    )}
                  </span>
                </div>

                <div className="space-y-1 text-right">
                  <div className="font-medium">
                    {format(new Date(segment.arrival.at), "HH:mm")} -{" "}
                    {segment.arrival.iataCode}
                  </div>
                  <div className="text-gray-500">
                    {format(new Date(segment.arrival.at), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
