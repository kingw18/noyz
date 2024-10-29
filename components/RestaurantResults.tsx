"use client";

import { useRestaurantFilters } from "@/app/hooks/useRestaurantFilters";
// import RecommendationBanner from "./RecommendationBanner";
import RestaurantList from "./RestaurantList";
import type { RestaurantWithNoiseEstimates } from "@/app/lib/definitions";
import { useTimePeriod } from "@/app/hooks/useTimePeriod";

export function RestaurantResults({
  initialRestaurants,
}: {
  initialRestaurants: RestaurantWithNoiseEstimates[];
}) {
  const { selectedPeriod } = useTimePeriod();
  const {
    minNoiseLevel,
    maxNoiseLevel,
    selectedNeighborhoods,
    selectedCuisines,
  } = useRestaurantFilters();

  const filteredRestaurants = initialRestaurants.filter((restaurant) => {
    const currentNoise =
      restaurant.estimated_noise_levels[
        selectedPeriod as keyof typeof restaurant.estimated_noise_levels
      ];

    const matchesNeighborhood =
      selectedNeighborhoods.length === 0 ||
      selectedNeighborhoods.includes(restaurant.neighborhood);

    const matchesNoiseLevel =
      currentNoise >= minNoiseLevel && currentNoise <= maxNoiseLevel;

    const matchesCuisine =
      selectedCuisines.length === 0 ||
      selectedCuisines.includes(restaurant.cuisine_type);

    return matchesNeighborhood && matchesNoiseLevel && matchesCuisine;
  });

  return (
    <>
      {/* <RecommendationBanner
        recommendations={filteredRestaurants.map((restaurant) => ({
          ...restaurant,
          id: restaurant.id.toString(),
          noiseLevel:
            restaurant.estimated_noise_levels[
              selectedPeriod as keyof typeof restaurant.estimated_noise_levels
            ],
        }))}
      /> */}

      <div>
        <h2 className="text-lg font-medium mb-4 text-primary">
          Recommended Manhattan Restaurants
        </h2>
        <RestaurantList
          restaurants={filteredRestaurants.map((restaurant) => ({
            ...restaurant,
            id: restaurant.id.toString(),
            noiseLevel:
              restaurant.estimated_noise_levels[
                selectedPeriod as keyof typeof restaurant.estimated_noise_levels
              ],
            location: {
              lat: restaurant.location_lat,
              lng: restaurant.location_lng,
              city: restaurant.city,
              address: restaurant.address,
              neighborhood: restaurant.neighborhood,
            },
          }))}
        />
      </div>
    </>
  );
}
