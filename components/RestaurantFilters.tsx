"use client";

import { TimePeriodSelector } from "./TimePeriodSelector";
import { NoiseControl } from "./NoiseControl";
import { FilterControls } from "./FilterControls";
import { useRestaurantFilters } from "@/app/hooks/useRestaurantFilters";
import type { RestaurantWithNoiseEstimates } from "@/app/lib/definitions";
import { useTimePeriod } from "@/app/hooks/useTimePeriod";

export function RestaurantFilters({
  restaurants,
}: {
  restaurants: RestaurantWithNoiseEstimates[];
}) {
  const { selectedPeriod, setSelectedPeriod } = useTimePeriod();
  const {
    minNoiseLevel,
    maxNoiseLevel,
    selectedNeighborhoods,
    selectedCuisines,
    setMinNoiseLevel,
    setMaxNoiseLevel,
    setSelectedNeighborhoods,
    setSelectedCuisines,
  } = useRestaurantFilters();

  const uniqueNeighborhoods = Array.from(
    new Set(restaurants.map((r) => r.neighborhood))
  ).sort();

  const uniqueCuisines = Array.from(
    new Set(restaurants.map((r) => r.cuisine_type))
  ).sort();

  return (
    <div className="space-y-6">
      <TimePeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="space-y-6">
        <h2 className="text-lg font-medium text-primary">Filter Restaurants</h2>
        <FilterControls
          neighborhoods={uniqueNeighborhoods}
          cuisines={uniqueCuisines}
          selectedNeighborhoods={selectedNeighborhoods}
          selectedCuisines={selectedCuisines}
          onNeighborhoodsChange={setSelectedNeighborhoods}
          onCuisinesChange={setSelectedCuisines}
        />

        <NoiseControl
          minLevel={minNoiseLevel}
          maxLevel={maxNoiseLevel}
          onMinChange={setMinNoiseLevel}
          onMaxChange={setMaxNoiseLevel}
        />
      </div>
    </div>
  );
}
