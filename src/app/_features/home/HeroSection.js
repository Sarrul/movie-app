// export const HeroSection = () => {
//   return (
//     <div className="bg-[url('/wicked.jpg')] bg-cover bg-center h-[600px] w-full max-w-[1440px] relative flex justify-center">
//       <div className="absolute bottom-[37px] inline-flex items-center gap-2 ">
//         <div className="rounded-full bg-white w-2 h-2"></div>
//         <div className="rounded-full bg-[rgba(255_255_255_/0.80)] w-2 h-2"></div>
//         <div className="rounded-full bg-[rgba(255_255_255_/0.80)] w-2 h-2"></div>
//       </div>
//     </div>
//   );
// };
"use client";
import * as React from "react";
import { useEffect, useState } from "react";

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

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export function HeroSection() {
  const [movieData, setMoviedata] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  console.log("movieData", movieData);
  return (
    <Carousel className="w-[1440px] h-[600px] relative  ">
      <CarouselContent className="flex h-full">
        {movieData.slice(0, 5).map((movie, index) => (
          <CarouselItem
            key={index}
            className="flex-shrink-0 flex-grow-0 basis-full h-full"
          >
            <Card className="h-full flex flex-col">
              <CardContent className="w-full h-[600px]">
                <div
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
                  }}
                  className="w-full h-full bg-cover bg-center"
                >
                  <div className=" flex flex-col items-start gap-4 pt-44.5 pl-35 w-[404px]">
                    <div>
                      <span className="text-white font-inter text-base font-normal leading-6">
                        Now Playing:
                      </span>
                      <p className="text-white font-inter text-4xl font-bold leading-[40px] tracking-[-0.9px]">
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
                    </div>
                    <div className="flex h-[40px] py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#F4F4F5] ">
                      <WatchTrailerIcon />
                      <button className="text-[var(--text-text-secondary-foreground)] font-inter text-sm font-medium leading-5">
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
