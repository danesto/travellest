import { TravelSearchForm } from "@/components/travel-search-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-lg p-8 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-center">
            Should I stay or should I go?
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Find fully prepared, cheapest travel arrangements for your next trip
          </p>
        </div>
        <TravelSearchForm />
      </div>
    </main>
  );
}
