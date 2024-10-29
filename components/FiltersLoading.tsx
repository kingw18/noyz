"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FiltersLoading() {
  return (
    <div className="space-y-6">
      {/* Time Period Selector Loading */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-6 w-48" />
        
        {/* Filter Controls Loading */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>
        </div>

        {/* Noise Control Loading */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-16" />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-16" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
