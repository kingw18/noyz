export function getCurrentMealPeriod(hour: number): string | null {
  if (hour >= 6 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 15) return "lunch";
  if (hour >= 17 && hour < 23) return "dinner";
  return null;
}

export const getDefaultTimePeriod = () => {
  // During SSR, default to a safe value
  if (typeof window === "undefined") {
    return "dinner";
  }

  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 15) return "lunch";
  return "dinner";
};
