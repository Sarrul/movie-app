"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";

export const LoadingMoviesType = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="flex flex-col gap-8 w-screen min-h-screen items-center">
        <Header />
        {/* Section title */}
        <div className="w-[1280px]  flex flex-row justify-start">
          <Skeleton width={200} height={28} borderRadius={9999} />
        </div>

        {/* Movie cards skeletons */}
        <div className="px-20 grid grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Poster */}
              <Skeleton height={340} width={230} borderRadius={12} />
              {/* Info container */}
              <div className="flex flex-col gap-2">
                {/* Title */}
                <Skeleton width={180} height={20} borderRadius={6} />
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton width={40} height={16} borderRadius={6} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="w-[1280px] flex justify-end pt-10 gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width={40} height={40} borderRadius={8} />
          ))}
        </div>
        <Footer />
      </div>
    </SkeletonTheme>
  );
};
