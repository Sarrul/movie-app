"use client";

import { Header } from "../app/_features/Header";
import { Footer } from "../app/_features/Footer";
import { HeroSection } from "../app/_features/home/HeroSection";
import { MovieList } from "../app/_features/home/MovieList";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-full">
      <Header />
      <HeroSection />
      <MovieList type="upcoming" title="Upcoming" />
      <MovieList type="popular" title="Popular" />
      <MovieList type="top_rated" title="Top rated" />
      <Footer />
    </div>
  );
}
