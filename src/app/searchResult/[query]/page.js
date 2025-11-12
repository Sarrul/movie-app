"use client";
import { useParams } from "next/navigation";
import { MovieCard } from "@/app/_components/MovieCard";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function SearchResults() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const query = decodeURIComponent(params.query);
  const [page, setPage] = useState(1);

  const [movieData, setMoviedata] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const handlePreviousBtn = (page) => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextBtn = (page) => {
    setPage(page + 1);
  };

  useEffect(() => {
    const SearchDataList = async () => {
      setLoading(true);
      const SearchDataEndpoint = `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`;
      const searchDataResponse = await fetch(SearchDataEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await searchDataResponse.json();
      setSearchData(data.results);
      setTotalResults(data.total_results);
      setLoading(false);
    };
    const getData = async () => {
      // setLoading(true);
      try {
        const GenreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
        const response = await fetch(GenreEndpoint, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setMoviedata(data.genres);
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
      }
      // setLoading(false);
    };
    if (query) SearchDataList();
    getData();
  }, [query, page]);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col gap-[52px] ">
      <Header />
      <div className="flex flex-col gap-8 mb-[300px]">
        <div className="w-[1280px] flex justify-start">
          <p className="font-semibold text-2xl ">Search results</p>
        </div>
        <div className="flex flex-row gap-7">
          {/* search result */}
          <div className="w-[804px]">
            <div className="flex flex-col items-start gap-8">
              <p className="font-semibold text-xl">
                {totalResults} results for {query}
              </p>
              {searchData.length > 0 ? (
                <div className=" grid grid-cols-4 gap-6 ">
                  {searchData.slice(0, 8).map((movie) => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      rating={movie.vote_average}
                      title={movie.title}
                      imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-[95px] w-full border rounded-lg border-[#E4E4E7] flex justify-center items-center">
                  <p>No results found</p>
                </div>
              )}
            </div>
            <div className=" flex justify-end pt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePreviousBtn(page)}
                      href="#"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={page === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(page + 1)}
                      href="#"
                      isActive={false}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setPage(page + 2)}
                      href="#"
                      isActive={false}
                    >
                      {page + 2}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handleNextBtn(page)}
                      href="#"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <div className="w-[2px] bg-[#E4E4E7] h-100% mx-4"></div>

          {/* genre */}
          <div className="w-[384px]">
            <div className="gap-1 py-2 ">
              <p className="font-semibold text-2xl ">Genre</p>
              <p className="font-normal text-base ">
                See lists of movies by genre
              </p>
            </div>
            <div className="h-1 border-b border-b-[#E4E4E7]"></div>
            <div className="flex flex-wrap gap-4 w-full py-4 pr-4 ">
              {movieData.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Badge
                    variant="default | outline | secondary | destructive"
                    className="text-black dark:text-white"
                  >
                    {genre.name}
                    <ChevronRight />
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
