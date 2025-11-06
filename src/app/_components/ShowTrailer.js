"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function ShowTrailer({ id, show, onClose }) {
  const [trailerKey, setTrailerKey] = useState("");
  const router = useRouter();

  const getTrailer = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/videos?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const trailer = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    setTrailerKey(trailer?.key);
  };

  const handleSeeDetail = (id) => {
    router.push(`/movieDetails/${id}`);
  };

  useEffect(() => {
    if (show) getTrailer();
  }, [id, show]);

  if (!show) return null;

  return (
    <div>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-3xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <button
            className="absolute top-3 right-3 bg-white px-3 py-1 rounded-[10px]"
            onClick={() => handleSeeDetail(id)}
          >
            see movie detail
          </button>
        </div>
      </div>
    </div>
  );
}
