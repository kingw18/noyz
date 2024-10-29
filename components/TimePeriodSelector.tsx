import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sunrise, Sun, Sunset } from "lucide-react";

interface TimePeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export function TimePeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: TimePeriodSelectorProps) {
  return (
    <div className="mb-8">
      <Tabs
        defaultValue={selectedPeriod}
        className="w-full"
        onValueChange={onPeriodChange}
      >
        <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm">
          <TabsTrigger
            value="breakfast"
            className="data-[state=active]:bg-primary flex items-center justify-center"
          >
            <Sunrise className="h-4 w-4 mr-2" />
            Breakfast
          </TabsTrigger>
          <TabsTrigger
            value="lunch"
            className="data-[state=active]:bg-primary flex items-center justify-center"
          >
            <Sun className="h-4 w-4 mr-2" />
            Lunch
          </TabsTrigger>
          <TabsTrigger
            value="dinner"
            className="data-[state=active]:bg-primary flex items-center justify-center"
          >
            <Sunset className="h-4 w-4 mr-2" />
            Dinner
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}