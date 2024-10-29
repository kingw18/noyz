import { sql } from "@vercel/postgres";

// Define your types for restaurants, neighborhoods, and reviews.
export type Restaurant = {
  id: number;
  name: string;
  description: string;
  noise_level: number;
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

export async function fetchRestaurants() {
  try {
    const data = await sql<
      Restaurant[]
    >`SELECT * FROM Restaurants ORDER BY name ASC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch restaurants.");
  }
}

export async function fetchNeighborhoods() {
  try {
    const data = await sql<
      Neighborhood[]
    >`SELECT * FROM Neighborhoods ORDER BY name ASC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch neighborhoods.");
  }
}

export async function fetchReviews(restaurantId: number) {
  try {
    const data = await sql<Review[]>`
      SELECT * FROM Reviews WHERE restaurant_id = ${restaurantId} ORDER BY review_timestamp DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch reviews.");
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
