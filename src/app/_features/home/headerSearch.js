"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import { SearchIcon } from "@/app/_icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const HeaderSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const SearchDataList = async () => {
    const SearchDataEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;
    const searchDataResponse = await fetch(SearchDataEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await searchDataResponse.json();
    setSearchData(data.results);
  };

  useEffect(() => {
    SearchDataList();
  }, [searchValue]);

  console.log("headerSearchData", searchData);

  return (
    <div>
      <div className="flex gap-2 items-center pl-[12px] w-[379px]  h-[36px] border border-[#E4E4E7]  rounded-md">
        <SearchIcon />
        <input
          placeholder="Search.."
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-none outline-none "
        />
      </div>
      {searchValue && (
        <div className="absolute z-[100] bg-[#FFFFFF] rounded-lg border border-[#E4E4E7] mt-1 w-[577px]">
          {searchData.slice(0, 5).map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                direction="horizontal"
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                imageUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            );
          })}
          <button className="text-sm font-medium leading-[20px] py-[8px] px-[16px]">
            See all results for "{searchValue}"
          </button>
        </div>
      )}
    </div>
  );
};
