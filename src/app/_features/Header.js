import { ChevronDown } from "../_icons/ChevronDown";
import { MagnifyIcon } from "../_icons/MaginfyIcon";
import { MovieIcon } from "../_icons/MovieIcon";
import { Moon } from "../_icons/Moon";
import Link from "next/link";
import { Genre } from "./home/genre";

export const Header = () => {
  return (
    <div className="h-[59px]  flex items-center justify-between w-[1280px]">
      <Link
        href="/"
        className="text-[#4338CA] flex flex-row gap-2 items-center"
      >
        <MovieIcon />
        <p className="text-[16px] font-bold">Movie Z</p>
      </Link>

      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-row border border-[#E4E4E7] shadow-sm w-[97px] h-[36px] px-2 justify-center items-center gap-2 rounded-md">
          <Genre />
        </div>

        <div className="flex flex-row border border-[#E4E4E7] shadow-sm w-[379px] h-[36px] px-2 justify-start items-center gap-2 rounded-md">
          <MagnifyIcon />
          <input
            className="font-inter text-sm font-normal leading-5 focus:outline-none focus:ring-0 w-full"
            placeholder="Search.."
            type="text"
          />
        </div>
      </div>

      <div className="flex w-9 h-9 justify-center items-center border border-[#E4E4E7] shadow-sm rounded-md">
        <Moon />
      </div>
    </div>
  );
};
