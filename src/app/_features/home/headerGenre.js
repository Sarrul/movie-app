import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const Genre = () => {
  const [loading, setLoading] = useState(false);

  const [movieData, setMoviedata] = useState([]);
  const getData = async () => {
    setLoading(true);
    try {
      const GenreEndpoint = `${BASE_URL}/genre/movie/list?language=en`;
      const response = await fetch(GenreEndpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setMoviedata(data.genres);
    } catch (err) {
      console.error("Failed to fetch upcoming movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // if (loading) return <div>loading .... </div>;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">
            Genre
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <div className="gap-1 py-2 px-4">
              <p className="font-semibold text-2xl ">Genre</p>
              <p className="font-normal text-base ">
                See lists of movies by genre
              </p>
            </div>
            <div className="h-1 border-b border-b-[#E4E4E7]  ml-4"></div>
            <div className="flex flex-wrap gap-2 w-full p-2 ">
              {movieData.map((genre) => (
                <NavigationMenuLink
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Badge
                    variant="default | outline | secondary | destructive"
                    className="text-black"
                  >
                    {genre.name}
                    <ChevronRight />
                  </Badge>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};
