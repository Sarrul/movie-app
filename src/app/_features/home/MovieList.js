"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingMovieList } from "../skeloton/LoadingMovielist";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const MovieList = ({ type, title }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [movieData, setMoviedata] = useState([]);
  const getData = async () => {
    setLoading(true);
    try {
      const MoviesEndpoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
      const response = await fetch(MoviesEndpoint, {
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
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSeeMorebtn = () => {
    router.push(`movies/${type}`);
  };

  if (loading)
    return (
      <div>
        <LoadingMovieList />
      </div>
    );
  return (
    <div className="gap-8 flex flex-col">
      <div className="max-w-full flex flex-row justify-between px-20 mt-13 ">
        <p className="font-semibold text-2xl ">{title}</p>
        <div
          className="flex h-9 py-2 px-4 justify-center items-center gap-2 cursor-pointer"
          onClick={handleSeeMorebtn}
        >
          <p className="text-sm font-medium hover:underline">See more</p>
          <ArrowRight strokeWidth={1} className="w-4 h-4" />
        </div>
      </div>
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
  );
};
