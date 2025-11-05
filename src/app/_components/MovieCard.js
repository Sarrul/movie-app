import { StarIcon } from "../_icons/StarIcon";
import { useRouter } from "next/navigation";

export const MovieCard = ({ rating, title, imageUrl, id }) => {
  const router = useRouter();

  const handleMovieDetails = (id) => {
    router.push(`/movieDetails/${id}`);
  };
  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => handleMovieDetails(id)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-[340px] w-full max-w-[230px] rounded-t-lg object-cover"
      />
      <div className="max-w-[230px] w-full h-[95px] bg-[#F4F4F5] rounded-b-lg p-2 flex flex-col justify-between">
        <div className="flex items-center gap-1">
          <StarIcon />
          <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
            {Math.round(rating)}
            <span className="text-base font-normal text-[#71717A]">/10</span>
          </p>
        </div>
        <p className="h-[56px] text-lg font-normal leading-[28px] line-clamp-2 overflow-hidden text-ellipsis ">
          {title}
        </p>
      </div>
    </div>
  );
};
