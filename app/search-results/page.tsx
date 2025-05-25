import { Suspense } from "react";
import { searchFlightOffers } from "@/app/actions/flight-search";
import { FlightResults } from "@/components/flight-results";
import { format } from "date-fns";

type SearchParams = {
  searchParams: {
    country: string;
    startDate: string;
    endDate: string;
    transportation: string;
  };
};

export default async function SearchResultsPage({
  searchParams,
}: SearchParams) {
  const params = await searchParams;

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Search Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Flights from NYC to {params.country} •{" "}
            {format(new Date(params.startDate), "MMM d")} -{" "}
            {format(new Date(params.endDate), "MMM d, yyyy")}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="mt-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden h-40 bg-white/90 dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="absolute inset-0">
                    <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  <div className="relative space-y-3">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <SearchResultsContent searchParams={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function SearchResultsContent({ searchParams }: SearchParams) {
  const results = await searchFlightOffers({
    country: searchParams.country,
    startDate: new Date(searchParams.startDate),
    endDate: new Date(searchParams.endDate),
    transportation: searchParams.transportation as "car" | "plane",
  });

  return <FlightResults offers={results.offers} error={results.error} />;
}
