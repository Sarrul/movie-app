"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { StarIcon } from "@/app/_icons/StarIcon";
import { WatchTrailerIcon } from "@/app/_icons/WatchTrailerIcon";
import ShowTrailer from "@/app/_components/ShowTrailer";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection(id) {
  const [movieData, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const nowPlayingEndpoint = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
      const response = await fetch(nowPlayingEndpoint, {
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

  const handleMovieDetails = (id) => {
    router.push(`movieDetails/${id}`);
  };

  if (loading)
    return (
      <div>
        <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
          <Skeleton width={1440} height={600} />
        </SkeletonTheme>
      </div>
    );
  return (
    <Carousel className="w-full h-[246px] lg:h-[600px] relative ">
      <CarouselContent className="flex h-full">
        {movieData.slice(0, 5).map((movie, index) => (
          <CarouselItem
            key={index}
            className="flex-shrink-0 flex-grow-0 basis-full h-full"
          >
            <Card className="h-full flex flex-col">
              <CardContent className="w-full h-full">
                <div
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                  }}
                  className="w-full h-full bg-cover bg-center cursor-pointer"
                  onClick={() => handleMovieDetails(movie.id)}
                >
                  <div className=" flex flex-col items-start gap-4 pt-12 sm:pt-16 md:pt-32 lg:pt-44 pl-4 sm:pl-8 md:pl-16 lg:pl-35 w-[90%] sm:w-[404px]">
                    <div>
                      <span className="text-white font-inter text-base font-normal leading-6">
                        Now Playing:
                      </span>
                      <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
                        {movie.title}
                      </p>
                      <div className="flex gap-1 items-center">
                        <StarIcon />
                        <p className="text-[#FAFAFA] font-inter text-lg font-semibold leading-7">
                          {movie.vote_average}
                        </p>
                        <p className=" text-[#71717A] font-inter text-base font-normal leading-6">
                          /10
                        </p>
                      </div>
                    </div>
                    <div className="text-[#FAFAFA] font-inter text-xs font-normal leading-4 w-[302px]">
                      {movie.overview}
                    </div>{" "}
                    <div className="flex h-10 py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#F4F4F5] hover:bg-[#f4f4f5]/70 text-sm sm:text-base">
                      <WatchTrailerIcon />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovieId(movie.id);
                          setShowTrailer(true);
                        }}
                        className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-50"
                      >
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
      <ShowTrailer
        id={selectedMovieId}
        show={showTrailer}
        onClose={() => setShowTrailer(false)}
      />
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
