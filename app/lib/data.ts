import { sql } from "@vercel/postgres";

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  cuisine_type: string;
  location_lat: number;
  location_lng: number;
  city: string;
  address: string;
  neighborhood: string;
};

export type Neighborhood = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  restaurant_id: number;
  noise_level: number;
  review_timestamp: Date;
};
type MealPeriod = "breakfast" | "lunch" | "dinner";

type TimeRange = {
  start: number;
  end: number;
};

type RestaurantWithNoiseEstimates = Restaurant & {
  estimated_noise_levels: {
    [key in MealPeriod]: number;
  };
  current_noise_estimate: number;
  current_meal_period: MealPeriod | null;
};

// Define meal time ranges (24-hour format)
const MEAL_PERIODS: Record<MealPeriod, TimeRange> = {
  breakfast: { start: 6, end: 11 },
  lunch: { start: 11, end: 15 },
  dinner: { start: 17, end: 23 },
};

// Helper function to determine current meal period
function getCurrentMealPeriod(hour: number): MealPeriod | null {
  for (const [period, range] of Object.entries(MEAL_PERIODS)) {
    if (hour >= range.start && hour < range.end) {
      return period as MealPeriod;
    }
  }
  return null;
}

// Helper function to check if a timestamp falls within a meal period
function isInMealPeriod(timestamp: Date, period: MealPeriod): boolean {
  const hour = timestamp.getHours();
  const { start, end } = MEAL_PERIODS[period];
  return hour >= start && hour < end;
}

// Function to fetch restaurants with time-based noise estimates
export async function fetchRestaurantsWithNoiseEstimates(): Promise<
  RestaurantWithNoiseEstimates[]
> {
  try {
    // First, fetch all restaurants
    const restaurants = await fetchRestaurants();

    // For each restaurant, fetch reviews and calculate noise levels by time period
    const restaurantsWithEstimates = await Promise.all(
      restaurants.map(async (restaurant) => {
        const reviews = await fetchReviews(restaurant.id);

        // Calculate average noise levels for each meal period
        const noiseLevelsByPeriod = Object.keys(MEAL_PERIODS).reduce(
          (acc, period) => {
            const periodReviews = reviews.filter((review) =>
              isInMealPeriod(review.review_timestamp, period as MealPeriod)
            );

            const averageNoise =
              periodReviews.length > 0
                ? periodReviews.reduce(
                    (sum, review) => sum + review.noise_level,
                    0
                  ) / periodReviews.length
                : 1; // Fall back to default noise level if no reviews

            return {
              ...acc,
              [period]: Number(averageNoise.toFixed(1)),
            };
          },
          {} as Record<MealPeriod, number>
        );

        // Get current meal period
        const currentHour = new Date().getHours();
        const currentMealPeriod = getCurrentMealPeriod(currentHour);

        return {
          ...restaurant,
          estimated_noise_levels: noiseLevelsByPeriod,
          current_noise_estimate: currentMealPeriod
            ? noiseLevelsByPeriod[currentMealPeriod]
            : 1,
          current_meal_period: currentMealPeriod,
        };
      })
    );

    return restaurantsWithEstimates;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch restaurants with noise estimates.");
  }
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const data = await sql<Restaurant>`
      SELECT * FROM Restaurants ORDER BY name ASC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch restaurants.");
  }
}

export async function fetchNeighborhoods(): Promise<Neighborhood[]> {
  try {
    const data = await sql<Neighborhood>`
      SELECT * FROM Neighborhoods ORDER BY name ASC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neighborhoods.");
  }
}

export async function fetchReviews(restaurantId: number) {
  try {
    const data = await sql<Review>`
      SELECT * FROM Reviews WHERE restaurant_id = ${restaurantId} ORDER BY review_timestamp DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reviews.");
  }
}

export async function fetchRestaurantWithNoiseEstimates(
  restaurantId: number
): Promise<RestaurantWithNoiseEstimates | null> {
  try {
    const data = await sql<Restaurant>`
      SELECT * FROM Restaurants WHERE id = ${restaurantId}
    `;

    if (data.rows.length === 0) {
      return null;
    }

    const restaurant = data.rows[0];
    const reviews = await fetchReviews(restaurantId);

    // Calculate average noise levels for each meal period
    const noiseLevelsByPeriod = Object.keys(MEAL_PERIODS).reduce(
      (acc, period) => {
        const periodReviews = reviews.filter((review) =>
          isInMealPeriod(review.review_timestamp, period as MealPeriod)
        );

        const averageNoise =
          periodReviews.length > 0
            ? periodReviews.reduce(
                (sum, review) => sum + review.noise_level,
                0
              ) / periodReviews.length
            : 1;

        return {
          ...acc,
          [period]: Number(averageNoise.toFixed(1)),
        };
      },
      {} as Record<MealPeriod, number>
    );

    // Get current meal period
    const currentHour = new Date().getHours();
    const currentMealPeriod = getCurrentMealPeriod(currentHour);

    return {
      ...restaurant,
      estimated_noise_levels: noiseLevelsByPeriod,
      current_noise_estimate: currentMealPeriod
        ? noiseLevelsByPeriod[currentMealPeriod]
        : 1,
      current_meal_period: currentMealPeriod,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch restaurant with noise estimates.");
  }
}

export async function fetchFilteredRestaurants(
  neighborhood: string,
  noiseLevelRange: [number, number],
  cuisineType: string
) {
  try {
    const data = await sql<Restaurant[]>`
      SELECT * FROM Restaurants
      WHERE neighborhood = ${neighborhood}
        AND noise_level BETWEEN ${noiseLevelRange[0]} AND ${noiseLevelRange[1]}
        AND cuisine_type ILIKE ${`%${cuisineType}%`}
      ORDER BY name ASC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered restaurants.");
  }
}

// Function to insert a review into the database.
export async function insertReview(
  restaurantId: number,
  noiseLevel: number,
  reviewTimestamp: Date = new Date()
) {
  try {
    const data = await sql`
      INSERT INTO Reviews (restaurant_id, noise_level, review_timestamp)
      VALUES (${restaurantId}, ${noiseLevel}, ${reviewTimestamp.toISOString()})
      RETURNING id;
    `;
    return data.rows[0].id; // Return the ID of the newly created review
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert review.");
  }
}
