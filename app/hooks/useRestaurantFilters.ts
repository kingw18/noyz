"use client";

import { create } from "zustand";

interface FilterState {
  minNoiseLevel: number;
  maxNoiseLevel: number;
  selectedNeighborhoods: string[];
  selectedCuisines: string[];
}

interface FilterActions {
  setMinNoiseLevel: (level: number) => void;
  setMaxNoiseLevel: (level: number) => void;
  setSelectedNeighborhoods: (neighborhoods: string[]) => void;
  setSelectedCuisines: (cuisines: string[]) => void;
}

const useRestaurantFilters = create<FilterState & FilterActions>((set) => ({
  // Initial state
  minNoiseLevel: 1,
  maxNoiseLevel: 5,
  selectedNeighborhoods: [],
  selectedCuisines: [],

  // Actions
  setMinNoiseLevel: (level) => set({ minNoiseLevel: level }),
  setMaxNoiseLevel: (level) => set({ maxNoiseLevel: level }),
  setSelectedNeighborhoods: (neighborhoods) =>
    set({ selectedNeighborhoods: neighborhoods }),
  setSelectedCuisines: (cuisines) => set({ selectedCuisines: cuisines }),
}));

export { useRestaurantFilters };
