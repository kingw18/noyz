import { useState, useEffect } from "react";
import { getDefaultTimePeriod } from "../lib/utils";

export const useTimePeriod = () => {
  // Initialize with a consistent default value
  const [selectedPeriod, setSelectedPeriod] = useState("dinner");

  // Update the period only after component mounts
  useEffect(() => {
    setSelectedPeriod(getDefaultTimePeriod());
  }, []);

  return {
    selectedPeriod,
    setSelectedPeriod,
  };
};
