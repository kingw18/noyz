"use client";
import { useEffect, useState } from "react";
import RestaurantList from "@/components/RestaurantList";
import RecommendationBanner from "@/components/RecommendationBanner";
import { fetchRestaurants, type Restaurant } from "@/app/lib/data";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data.flat());
        console.log(data);
      } catch (err) {
        setError("Failed to fetch restaurants.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const quietRestaurants = restaurants.filter(
    (restaurant) => restaurant.noise_level <= 2
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="container mx-auto p-8">
      <RecommendationBanner
        recommendations={quietRestaurants.map((restaurant) => ({
          ...restaurant,
          id: restaurant.id.toString(),
        }))}
      />
      <h1 className="text-2xl font-bold mb-4">All Manhattan Restaurants</h1>
      <RestaurantList
        restaurants={restaurants.map((restaurant) => ({
          ...restaurant,
          id: restaurant.id.toString(),
          noiseLevel: restaurant.noise_level,
          location: {
            lat: restaurant.location_lat,
            lng: restaurant.location_lng,
            city: restaurant.city,
            address: restaurant.address,
            neighborhood: restaurant.neighborhood,
          },
        }))}
      />
    </main>
  );
};

export default RestaurantsPage;
