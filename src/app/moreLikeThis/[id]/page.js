"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { useParams } from "next/navigation";
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
import { LoadingMoviesType } from "@/app/_features/skeloton/LoadingMovieType";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoreLikeThis() {
  const params = useParams();
  const [movieData, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const id = params.id;

  useEffect(() => {
    const getData = async () => {
      try {
        //   setLoading(true);
        const MoreLikeThisEndpoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=${page}`;
        console.log("Fetching:", MoreLikeThisEndpoint);

        const response = await fetch(MoreLikeThisEndpoint, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setMoviedata(data.results);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
        setLoading(false);
      }
    };
    getData();
  }, [page, id]);

  const handlePreviousBtn = (page) => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextBtn = (page) => {
    setPage(page + 1);
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <LoadingMoviesType />
      </div>
    );

  return (
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Header />
      <div className="flex flex-col items-start">
        <p className="font-semibold text-2xl py-6  pl-20">More like this</p>
        <div className="px-20 grid grid-cols-5 gap-8 overflow-x-auto">
          {movieData.slice(0, 10).map((movie) => (
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
      <div className="w-[1280px] flex justify-end pt-10">
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
              <PaginationNext onClick={() => handleNextBtn(page)} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  );
}
