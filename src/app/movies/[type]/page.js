"use client";
import { MovieCard } from "@/app/_components/MovieCard";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoviesType() {
  const param = useParams();

  const [page, setPage] = useState(1);

  const [movieData, setMoviedata] = useState([]);

  const getData = async () => {
    //   setLoading(true);
    try {
      const PopularMovieEndpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=1`;
      const response = await fetch(PopularMovieEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      setMoviedata(data.results);
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
    }
    //   setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Header />
      <div className="flex flex-col items-start">
        <p className="font-semibold text-2xl py-6  pl-20">{param.type}</p>
        <div className="px-20 grid grid-cols-5 gap-8 overflow-x-auto">
          {movieData.map((movie) => (
            <MovieCard
              key={movie.id}
              rating={movie.vote_average}
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
