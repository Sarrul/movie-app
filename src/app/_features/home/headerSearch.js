"use client";

import { MovieCard } from "@/app/_components/MovieCard";
import { SearchIcon } from "@/app/_icons/SearchIcon";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const HeaderSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const SearchDataList = async () => {
    setLoading(true);
    const SearchDataEndpoint = `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`;
    const searchDataResponse = await fetch(SearchDataEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await searchDataResponse.json();
    setSearchData(data.results);
    setLoading(false);
  };
  const handleSeeAllResults = () => {
    router.push(`/searchResult/${encodeURIComponent(searchValue)}`);
  };

  useEffect(() => {
    SearchDataList();
  }, [searchValue]);

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
          {loading ? (
            <div className="flex justify-center items-center w-[553px] h-[128px]">
              <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
            </div>
          ) : (
            <div className="w-full overflow-y-auto px-2">
              {searchData.length > 0 ? (
                <div>
                  {searchData.slice(0, 5).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      direction="horizontal"
                      id={movie.id}
                      title={movie.title}
                      rating={movie.vote_average}
                      imageUrl={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    />
                  ))}
                  <button
                    className="text-sm font-medium leading-[20px] py-[8px] px-[16px] hover:underline cursor-pointer"
                    onClick={handleSeeAllResults}
                  >
                    See all results for "{searchValue}"
                  </button>
                </div>
              ) : (
                <div className="h-[95px] flex justify-center items-center">
                  <p>No results found. </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
