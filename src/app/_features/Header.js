import { ChevronDown } from "../_icons/ChevronDown";
import { SearchIcon } from "../_icons/SearchIcon";
import { MovieIcon } from "../_icons/MovieIcon";
import { Moon } from "../_icons/Moon";
import Link from "next/link";
import { Genre } from "./home/headerGenre";
import { HeaderSearch } from "./home/headerSearch";

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
        <HeaderSearch />
      </div>

      <div className="flex w-9 h-9 justify-center items-center border border-[#E4E4E7] shadow-sm rounded-md">
        <Moon />
      </div>
    </div>
  );
};
