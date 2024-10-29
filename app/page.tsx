import { Suspense } from "react";
import { fetchRestaurantsWithNoiseEstimates } from "@/app/lib/data";
import { RestaurantFilters } from "../components/RestaurantFilters";
import { RestaurantResults } from "../components/RestaurantResults";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiltersLoading } from "@/components/FiltersLoading";
import { ResultsLoading } from "@/components/ResultsLoading";

// export default async function RestaurantsPage() {
//   const restaurants = await fetchRestaurantsWithNoiseEstimates();

//   return (
//     <div className="min-h-screen text-white">
//       <Card className="mt-8 border-gray-700">
//         <CardHeader className="border-b border-gray-700">
//           <CardTitle className="text-2xl font-bold bg-clip-text text-black">
//             Manhattan Restaurant Guide
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6 pt-6">
//           <Suspense fallback={<FiltersLoading />}>
//             <RestaurantFilters restaurants={restaurants} />
//           </Suspense>

//           <Suspense fallback={<ResultsLoading />}>
//             <RestaurantResults initialRestaurants={restaurants} />
//           </Suspense>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
export const metadata = {
  title: 'Manhattan Restaurant Guide',
  description: 'Find the perfect dining spot in Manhattan based on noise levels and more.',
};

export default async function RestaurantsPage() {
  const restaurants = await fetchRestaurantsWithNoiseEstimates();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="border-border bg-card shadow-lg">
          <CardHeader className="border-b border-border space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold text-primary bg-clip-text">
              Manhattan Restaurant Guide
            </CardTitle>
            <p className="text-muted-foreground">
              Discover your next favorite dining spot
            </p>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <Suspense fallback={<FiltersLoading />}>
              <div className="bg-card/50 rounded-lg p-4">
                <RestaurantFilters restaurants={restaurants} />
              </div>
            </Suspense>

            <Suspense fallback={<ResultsLoading />}>
              <div className="bg-card/50 rounded-lg">
                <RestaurantResults initialRestaurants={restaurants} />
              </div>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
