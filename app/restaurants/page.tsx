import RestaurantList from "@/components/RestaurantList";
import RecommendationBanner from "@/components/RecommendationBanner";
import restaurantsData from "@/lib/data/restaurants.json";

const RestaurantsPage = () => {
  // Filter for quieter restaurants as recommendations (e.g., noise level 1-2)
  const quietRecommendations = restaurantsData.filter(
    (restaurant) => restaurant.noiseLevel <= 2
  );

  return (
    <main className="container mx-auto p-8">
      <RecommendationBanner recommendations={quietRecommendations} />
      <h1 className="text-2xl font-bold mb-4">All Manhattan Restaurants</h1>
      <RestaurantList restaurants={restaurantsData} />
    </main>
  );
};

export default RestaurantsPage;
