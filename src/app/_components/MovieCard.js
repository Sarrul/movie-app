import { ArrowRight } from "../_icons/ArrowRight";
import { StarIcon } from "../_icons/StarIcon";
import { useRouter } from "next/navigation";

export const MovieCard = ({ rating, title, imageUrl, id, direction }) => {
  const router = useRouter();

  const handleMovieDetails = () => {
    router.push(`/movieDetails/${id}`);
  };

  if (direction === "horizontal") {
    return (
      <div onClick={handleMovieDetails} className="cursor-pointer mt-2 ">
        <div className="flex gap-4 w-[550px] p-2 bg-white ml-3 rounded-lg hover:bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-[67px] h-[100px] rounded-lg object-cover"
          />
          <div className="flex flex-col gap-3 w-[454px] h-[99px]">
            <div>
              <p className="font-semibold truncate text-[#09090B] text-xl tracking-[-0.5px] drop-shadow-lg">
                {title}
              </p>
              <div className="text-[#09090B] flex items-center gap-1">
                <StarIcon />
                <p className="font-medium text-sm flex items-center gap-1">
                  {rating}
                  <span className="text-xs font-normal text-[#71717A]">
                    /10
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center justify-center text-sm font-medium ">
                2024
              </div>
              <button className="w-[120px] h-[36px] flex items-center justify-center gap-2 px-16px cursor-pointer ">
                <p className="text-sm font-medium text-[#09090B] hover:underline">
                  See more
                </p>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="w-100% h-[1px] border border-[#E4E4E7] m-2"></div>
      </div>
    );
  }
  const rate = Math.round(rating);
  return (
    <div onClick={handleMovieDetails} className="cursor-pointer">
      <div className="relative group h-[340px] w-full max-w-[230px] rounded-t-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="max-w-[230px] w-full h-[95px] bg-[#F4F4F5] rounded-b-lg p-2">
        <div className="flex items-center gap-1">
          <StarIcon />
          <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
            {rate}
            <span className="text-base font-normal text-[#71717A]">/10</span>
          </p>
        </div>
        <p className="h-[56px] text-lg font-normal leading-[28px] p-1">
          {title}
        </p>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className={`flex cursor-pointer${
  //       direction === "horizontal" ? "flex-row gap-4" : "flex-col"
  //     }`}
  //     onClick={() => handleMovieDetails(id)}
  //   >
  //     <img
  //       src={imageUrl}
  //       alt={title}
  //       className={`rounded-t-lg object-cover ${
  //         direction === "horizontal"
  //           ? "w-[67px] h-[100px]"
  //           : "w-full max-w-[230px] h-[340px]"
  //       }`}
  //     />
  //     <div
  //       className={`bg-pink-300  p-2 flex flex-col justify-between ${
  //         direction === "horizontal"
  //           ? "w-"
  //           : "max-w-[230px] w-full h-[95px]"
  //       }`}
  //     >
  //       <p
  //         className={`text-lg font-normal leading-[28px] line-clamp-2 overflow-hidden ${
  //           direction === "horizontal" ? "w-full" : "h-[56px]"
  //         }`}
  //       >
  //         {title}
  //       </p>
  //       <div className="flex items-center gap-1">
  //         <StarIcon />
  //         <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
  //           {Math.round(rating)}
  //           <span className="text-base font-normal text-[#71717A]">/10</span>
  //         </p>
  //       </div>
  //       {/* <p className="h-[56px] text-lg font-normal leading-[28px] line-clamp-2 overflow-hidden text-ellipsis "> */}
  //     </div>
  //   </div>
  // );
};
