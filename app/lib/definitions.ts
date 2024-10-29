export type MealPeriod = "breakfast" | "lunch" | "dinner";

export type RestaurantWithNoiseEstimates = {
  id: number;
  name: string;
  description: string;
  cuisine_type: string;
  location_lat: number;
  location_lng: number;
  city: string;
  address: string;
  neighborhood: string;
  estimated_noise_levels: {
    [key in MealPeriod]: number;
  };
  current_noise_estimate: number;
  current_meal_period: MealPeriod | null;
};
