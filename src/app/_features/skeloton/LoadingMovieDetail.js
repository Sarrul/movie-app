import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";

export const LoadingMovieDetail = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="flex flex-col items-center max-w-full">
        <Header />
        <div className="flex flex-col gap-8 w-[1080px] mt-10">
          {/* Title and rating */}
          <div className="flex justify-between w-[1080px]">
            <div className="flex flex-col gap-2 items-start">
              <Skeleton width={211} height={40} borderRadius={9999} />
              <Skeleton width={237} height={28} borderRadius={9999} />
            </div>
            <div className="flex flex-col items-end">
              <p>rating</p>
              <Skeleton width={83} height={20} borderRadius={9999} />
              <Skeleton width={83} height={16} borderRadius={9999} />
            </div>
          </div>

          {/* Poster and backdrop */}
          <div className="flex flex-row gap-8">
            <Skeleton width={290} height={428} borderRadius={8} />
            <Skeleton
              className="flex-1"
              height={428}
              width={760}
              borderRadius={12}
            />
          </div>

          {/* Genres */}
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={60} height={24} borderRadius={12} />
            ))}
          </div>

          {/* Overview */}
          <div className="flex flex-col items-start gap-3 mt-4">
            <Skeleton width={1080} height={20} borderRadius={9999} />
            <Skeleton width={699} height={20} borderRadius={9999} />
          </div>

          {/* Writers / Stars / Director */}
          <div className="flex flex-col gap-6 mt-6">
            {["Director", "Writers", "Stars"].map((label) => (
              <div key={label}>
                <div className="flex gap-[53px]">
                  <Skeleton width={70} height={20} borderRadius={9999} />
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton
                        key={i}
                        width={80}
                        height={20}
                        borderRadius={9999}
                      />
                    ))}
                  </div>
                </div>
                <div className="border-t border-t-[#E4E4E7] h-1 mt-2"></div>
              </div>
            ))}
          </div>

          {/* More like this */}
          <div className="w-[1080px] flex flex-row justify-between ">
            <Skeleton width={250} height={32} borderRadius={9999} />
            <Skeleton width={165} height={36} borderRadius={9999} />
          </div>
          <div className="grid grid-cols-5 gap-8">
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
      </div>
      <Footer />
    </SkeletonTheme>
  );
};
