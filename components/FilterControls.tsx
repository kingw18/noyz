import { MultiSelect } from "@/components/MultiSelect";

interface FilterControlsProps {
  neighborhoods: string[];
  cuisines: string[];
  selectedNeighborhoods: string[];
  selectedCuisines: string[];
  onNeighborhoodsChange: (neighborhoods: string[]) => void;
  onCuisinesChange: (cuisines: string[]) => void;
}

export function FilterControls({
  neighborhoods,
  cuisines,
  selectedNeighborhoods,
  selectedCuisines,
  onNeighborhoodsChange,
  onCuisinesChange,
}: FilterControlsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
        <label className="block font-medium mb-2 text-primary">
          Neighborhoods
        </label>
        <MultiSelect
          options={neighborhoods}
          selected={selectedNeighborhoods}
          onChange={onNeighborhoodsChange}
          placeholder="Select neighborhoods"
          title="Neighborhoods"
        />
      </div>

      <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
        <label className="block font-medium mb-2 text-primary">
          Cuisine Types
        </label>
        <MultiSelect
          options={cuisines}
          selected={selectedCuisines}
          onChange={onCuisinesChange}
          placeholder="Select cuisine types"
          title="Cuisine Types"
        />
      </div>
    </div>
  );
}
