"use client";
import ShowTrailer from "@/app/_components/ShowTrailer";
import { Footer } from "@/app/_features/Footer";
import { Header } from "@/app/_features/Header";
import { StarIcon } from "@/app/_icons/StarIcon";
import { WatchTrailerIcon } from "@/app/_icons/WatchTrailerIcon";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
// import { useYoutubeDuration } from "@/app/_hooks/useYoutubeDuration";
import { ArrowRight } from "@/app/_icons/ArrowRight";
import { MovieCard } from "@/app/_components/MovieCard";
import { LoadingMovieDetail } from "@/app/_features/skeloton/LoadingMovieDetail";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

// const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// console.log("YouTube key:", YOUTUBE_API_KEY);

export default function MovieDetails() {
  const { id } = useParams();
  const [movieData, setMoviedata] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [crewData, setCrewData] = useState();
  const [similarMovies, setSimilarMovies] = useState([]);
  const router = useRouter();

  // const [trailerKey, setTrailerKey] = useState(null);

  // const getTrailerKey = async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}/movie/${id}/videos?language=en-US`, {
  //       headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  //     });
  //     const data = await res.json();
  //     const trailer = data.results.find(
  //       (v) => v.type === "Trailer" && v.site === "YouTube"
  //     );
  //     setTrailerKey(trailer?.key || null);
  //   } catch (err) {
  //     console.error("Failed to fetch trailer:", err);
  //   }
  // };

  const getData = async () => {
    try {
      setLoading(true);
      const MovieDetailsEndpoint = `${BASE_URL}/movie/${id}?language=en-US`;
      const response = await fetch(MovieDetailsEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const CrewEndpoint = `${BASE_URL}/movie/${id}/credits?language=en-US`;
      const crewResponse = await fetch(CrewEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const crewData = await crewResponse.json();

      setMoviedata(data);
      setCrewData(crewData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
      setLoading(false);
    }
  };

  const getSimilarMovies = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setSimilarMovies(data.results); // results is the array
    } catch (err) {
      console.error("Failed to fetch similar movies:", err);
    }
  };

  const handleSeeMorebtn = (id) => {
    router.push(`/moreLikeThis/${id}`);
  };

  const formatDuration = (minutes) => {
    if (!minutes) return null;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? h + "h " : ""}${m}m`;
  };

  const topWriters = crewData?.crew
    ?.filter((c) => c.job.toLowerCase().includes("writer"))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  const topCaster = crewData?.crew
    ?.filter((c) => c.known_for_department.toLowerCase().includes("acting"))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // const { duration, loading: durationLoading } = useYoutubeDuration(
  //   trailerKey,
  //   YOUTUBE_API_KEY
  // );

  useEffect(() => {
    getData();
    getSimilarMovies();
    // getTrailerKey();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10">
        <LoadingMovieDetail />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center max-w-full gap-[52px]">
      <Header />
      {/* main */}
      <div className="flex flex-col items-center justify-center gap gap-8">
        {/* title trailer */}
        <div className="flex flex-col gap-6 w-[1080px]">
          {/* movie title rating */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-4xl font-bold text-black">
                {movieData?.title}
              </p>
              <div className="font-normal text-lg flex flex-row gap-1">
                {movieData?.release_date}
                <p>·</p>
                {movieData?.adult === false && <p>PG</p>}
                <p>·</p>
                {formatDuration(movieData?.runtime)}
              </div>
            </div>
            <div className="flex flex-col">
              <p>rating</p>
              <div className="flex items-center gap-1">
                <StarIcon />
                <p className="font-semibold text-lg text-[#09090B] flex items-center gap-1">
                  {movieData?.vote_average}
                  <span className="text-base font-normal text-[#71717A]">
                    /10
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* movie poster trialer */}
          <div className="flex flex-row gap-8">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`}
              className="w-[290px] h-[428px]"
            />
            <div
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%),url('https://image.tmdb.org/t/p/original${movieData?.backdrop_path}')`,
              }}
              className=" bg-cover bg-center p-6 flex justify-start items-end w-full h-[428px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMovieId(movieData?.id);
              }}
            >
              <div className=" flex items-center justify-center h-10 gap-3">
                <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-white/80">
                  <WatchTrailerIcon />
                </div>
                <p className="text-white">
                  Play trailer
                  {/* {!durationLoading && duration && (
                    <span className="text-xs text-gray-200">
                      ({Math.floor(duration / 60)}:
                      {String(duration % 60).padStart(2, "0")})
                    </span>
                  )} */}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="flex flex-col gap-5 w-[1080px]">
          <div className="flex gap-2">
            {movieData?.genres?.map((g) => (
              <Badge
                key={g.id}
                variant="default | outline | secondary | destructive"
                className="text-black text-xs font-semibold"
              >
                {g.name}
              </Badge>
            ))}
          </div>

          <p className="font-normal text-base">{movieData?.overview}</p>

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-[53px]">
              <p className="text-base font-bold w-16"> Director</p>
              {crewData?.crew
                ?.filter((member) => member.job === "Director")
                .map((director) => (
                  <p
                    key={director.id}
                    className="text-base font-normal text-black"
                  >
                    {director.name}
                  </p>
                ))}
            </div>
            <div className="border-t border-t-[#E4E4E7] h-1"></div>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-[53px]">
              <p className="text-base font-bold w-16"> Writers</p>
              <p className="text-base font-normal text-black">
                {topWriters?.map((writer) => writer.name).join(" · ")}
              </p>
            </div>
            <div className="border-t border-t-[#E4E4E7] h-1"></div>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-row gap-[53px]">
              <p className="text-base font-bold w-16"> Stars</p>
              <p className="text-base font-normal text-black">
                {topCaster?.map((acting) => acting.name).join(" · ")}
              </p>
            </div>
            <div className="border-t border-t-[#E4E4E7] h-1"></div>
          </div>
        </div>
        {/* more like this */}
        <div className="gap-8 flex flex-col w-[1080px]">
          <div className="max-w-full flex flex-row justify-between">
            <p className="font-semibold text-2xl ">More like this</p>
            <div
              className="flex h-9 py-2 px-4 justify-center items-center gap-2 cursor-pointer"
              onClick={() => handleSeeMorebtn(id)}
            >
              <p className="text-sm font-medium hover:underline">See more</p>
              <ArrowRight />
            </div>
          </div>

          <div className=" grid grid-cols-5 gap-8 overflow-x-auto">
            {similarMovies.slice(0, 5).map((movie) => (
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
      </div>

      <Footer />
      <ShowTrailer
        id={selectedMovieId}
        show={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
