"use client";

import { Header } from "../app/_features/Header";
import { Footer } from "../app/_features/Footer";
import { HeroSection } from "../app/_features/home/HeroSection";
import { MovieList } from "../app/_features/home/MovieList";

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
