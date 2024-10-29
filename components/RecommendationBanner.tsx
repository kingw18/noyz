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
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary">Recommended Quiet Spots</CardTitle>
      </CardHeader>
      <CardContent className="max-h-48 overflow-y-auto">
        <div className="grid gap-4">
          {recommendations.map((restaurant) => (
            <div key={restaurant.id} className="space-y-1">
              <h3 className="text-lg font-semibold text-card-foreground">{restaurant.name}</h3>
              <p className="text-muted-foreground">{restaurant.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationBanner;
