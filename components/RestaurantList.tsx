import RestaurantCard, { Restaurant } from "./RestaurantCard";

const RestaurantList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  return (
    <section aria-label="List of Restaurants" className="grid gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </section>
  );
};

export default RestaurantList;
