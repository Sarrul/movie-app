"use client";

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
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { X } from "lucide-react";
import { MovieCard } from "@/app/_components/MovieCard";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function GenreResults() {
  const params = useParams();
  const genreId = params.id;
  const [page, setPage] = useState(1);
  const [movieData, setMoviedata] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([genreId]);
  const selectedGenreNames = genres
    .filter((g) => selectedGenres.includes(g.id.toString()))
    .map((g) => g.name)
    .join(", ");

  const getData = async () => {
    // setLoading(true);
    try {
      const GenreEndpoint = `${BASE_URL}/discover/movie?language=en&with_genres=${selectedGenres.join(
        ","
      )}&page=${page}`;
      const response = await fetch(GenreEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMoviedata(data.results);
      setTotalResults(data.total_results);
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
    }
    // setLoading(false);
  };

  const getGenre = async () => {
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
      setGenres(data.genres);
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
    }
    // setLoading(false);
  };

  const handlePreviousBtn = (page) => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextBtn = (page) => {
    setPage(page + 1);
  };

  useEffect(() => {
    getData();
    getGenre();
  }, [genreId, page, selectedGenres]);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col gap-[52px] ">
      <Header />
      <div className="flex flex-col gap-8 mb-[300px]">
        <div className="w-[1280px] flex justify-start">
          <p className="font-semibold text-2xl ">Search filter</p>
        </div>
        <div className="flex flex-row gap-7">
          {/* genre */}
          <div className="w-[384px]">
            <div className="gap-1 py-2 ">
              <p className="font-semibold text-xl ">Genre</p>
              <p className="font-normal text-base ">
                See lists of movies by genre
              </p>
            </div>
            <div className="h-1 border-b border-b-[#E4E4E7]"></div>
            <div className="flex flex-wrap gap-4 w-full py-4 pr-4 ">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  onClick={(e) => {
                    e.preventDefault(); // prevent default navigation
                    if (selectedGenres.includes(genre.id.toString())) {
                      // deselect if already selected
                      setSelectedGenres(
                        selectedGenres.filter(
                          (id) => id !== genre.id.toString()
                        )
                      );
                    } else {
                      setSelectedGenres([
                        ...selectedGenres,
                        genre.id.toString(),
                      ]);
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Badge
                    variant="default"
                    className={
                      selectedGenres.includes(genre.id.toString())
                        ? "bg-[#18181B] dark:bg-white dark:text-black text-[#FAFAFA] flex items-center gap-1"
                        : "bg-white dark:bg-[#18181B] dark:text-[#FAFAFA] text-black hover:bg-[#F4F4F5] flex items-center gap-1"
                    }
                  >
                    {genre.name}
                    {selectedGenres.includes(genre.id.toString()) ? (
                      <X
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGenres(
                            selectedGenres.filter(
                              (id) => id !== genre.id.toString()
                            )
                          );
                        }}
                        className="dark:text-black"
                      />
                    ) : (
                      <ChevronRight
                        strokeWidth={2}
                        color="currentColor"
                        className="h-5 w-4 dark:text-white"
                      />
                    )}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-[2px] bg-[#E4E4E7] h-100% mx-4"></div>

          {/* search result */}
          <div className="w-[804px]">
            <div className="flex flex-col items-start gap-8">
              <p className="font-semibold text-xl">
                {totalResults} Results for {selectedGenreNames}
              </p>
              <div className=" grid grid-cols-4 gap-6 ">
                {movieData.slice(0, 8).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    rating={movie.vote_average}
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  />
                ))}
              </div>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
