import { StarIcon } from "../_icons/StarIcon";
export const MovieCard = ({ rating, title, imageUrl }) => {
  console.log(imageUrl, "imageUrlimageUrlimageUrlimageUrl");
  return (
    <div className="flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        width={230}
        height={340}
        className="rounded-t-lg object-cover"
      />
      <div className="w-[230px] h-[95px] bg-[#F4F4F5] rounded-b-lg p-2 flex flex-col justify-between">
        <div className="flex items-center gap-1">
          <StarIcon />
          <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
            {rating}
            <span className="text-base font-normal text-[#71717A]">/10</span>
          </p>
        </div>
        <p className="h-[56px] w-[230px] text-lg font-normal leading-[28px]">
          {title}
        </p>
      </div>
    </div>
  );
};
