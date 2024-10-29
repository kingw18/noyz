import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  noiseLevel: number;
  location: {
    lat: number;
    lng: number;
    city: string;
    address: string;
    neighborhood: string;
  };
};

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{restaurant.description}</p>
        <p className="text-sm text-muted">
          Neighborhood: {restaurant.location.neighborhood}
        </p>
        <p className="text-sm text-muted">
          Address: {restaurant.location.address}
        </p>
        <p className="text-sm text-muted">
          Noise Level: {restaurant.noiseLevel || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
