import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const LoadingMovieList = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="flex flex-col gap-8">
        {/* Section header */}
        <div className="max-w-full flex flex-row justify-between px-20 mt-13 ">
          <Skeleton width={180} height={28} borderRadius={8} />
          <Skeleton width={90} height={28} borderRadius={8} />
        </div>

        {/* Movie cards skeletons */}
        <div className="px-20 grid grid-cols-5 gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Poster */}
              <Skeleton height={373} width={190} borderRadius={12} />
              {/* Title */}
              <Skeleton width={160} height={20} borderRadius={6} />
              {/* Rating */}
              <div className="flex items-center gap-2">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={40} height={16} borderRadius={6} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};
