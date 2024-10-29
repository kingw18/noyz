import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Recommendation = {
  id: string;
  name: string;
  description: string;
};

const RecommendationBanner = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  return (
    <Card className="bg-green-50 p-4 rounded-lg">
      <CardHeader>
        <CardTitle>Recommended Quiet Spots</CardTitle>
      </CardHeader>
      <CardContent className="max-h-48 overflow-y-auto">
        <div className="grid gap-4">
          {recommendations.map((restaurant) => (
            <div key={restaurant.id}>
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p>{restaurant.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationBanner;
