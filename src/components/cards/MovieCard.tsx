"use client";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Movie } from "../../services/tmdbApi";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favorites/favoritesSlice";
import { motion } from "framer-motion";

export default function MovieCard({ movie }: { movie: Movie }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.movies);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="rounded max-h-40 object-cover mb-2"
        />
      )}
      <div className="font-bold text-lg">{movie.title}</div>
      <div className="text-sm text-gray-500">{movie.overview}</div>
      <div className="flex gap-2 mt-2">
        <button
          className="text-blue-600 dark:text-blue-400 underline"
          onClick={() =>
            window.open(
              `https://www.themoviedb.org/movie/${movie.id}`,
              "_blank"
            )
          }
        >
          Play Now
        </button>
        <button
          className={`ml-auto px-3 py-1 rounded ${
            isFavorite
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite({ type: "movies", item: movie }))
              : dispatch(addFavorite({ type: "movies", item: movie }))
          }
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </motion.div>
  );
}
