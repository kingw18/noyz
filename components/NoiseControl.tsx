import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";

interface NoiseControlProps {
  minLevel: number;
  maxLevel: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export function NoiseControl({
  minLevel,
  maxLevel,
  onMinChange,
  onMaxChange,
}: NoiseControlProps) {
  const noiseLevels = [
    { value: 1, label: "Very Quiet" },
    { value: 2, label: "Quiet" },
    { value: 3, label: "Moderate" }, 
    { value: 4, label: "Loud" },
    { value: 5, label: "Very Loud" }
  ];

  return (
    <div className="space-y-6 bg-card/50 p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-4 text-primary">
          Minimum Noise Level
        </label>
        <RadioGroup
          defaultValue={minLevel.toString()}
          onValueChange={(value) => {
            const newMin = parseInt(value);
            if (newMin <= maxLevel) {
              onMinChange(newMin);
            }
          }}
          className="flex justify-center gap-4"
        >
          {noiseLevels.map((level) => {
            return (
              <div key={level.value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={level.value.toString()}
                  id={`min-${level.value}`}
                  className="peer sr-only"
                  disabled={level.value > maxLevel}
                />
                <label
                  htmlFor={`min-${level.value}`}
                  className="flex flex-col items-center space-y-1.5 rounded-md border-2 border-border bg-card p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-xs font-medium text-foreground">{level.label}</span>
                </label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4 text-primary">
          Maximum Noise Level
        </label>
        <RadioGroup
          defaultValue={maxLevel.toString()}
          onValueChange={(value) => {
            const newMax = parseInt(value);
            if (newMax >= minLevel) {
              onMaxChange(newMax);
            }
          }}
          className="flex justify-center gap-4"
        >
          {noiseLevels.map((level) => {
            return (
              <div key={level.value} className="flex flex-col items-center">
                <RadioGroupItem
                  value={level.value.toString()}
                  id={`max-${level.value}`}
                  className="peer sr-only"
                  disabled={level.value < minLevel}
                />
                <label
                  htmlFor={`max-${level.value}`}
                  className="flex flex-col items-center space-y-1.5 rounded-md border-2 border-border bg-card p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="text-xs font-medium text-foreground">{level.label}</span>
                </label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
