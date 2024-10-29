"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ResultsLoading() {
  return (
    <>
      {/* Recommendation Banner Loading */}
      <div className="mb-8">
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>

      {/* Restaurant List Loading */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" /> {/* "All Manhattan Restaurants" heading */}
        
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </>
  );
}
