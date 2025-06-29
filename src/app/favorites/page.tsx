"use client";
import { useAppSelector } from "../../hooks/useAppSelector";
import NewsCard from "../../components/cards/NewsCard";
import MovieCard from "../../components/cards/MovieCard";
import SocialCard from "../../components/cards/SocialCard";

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites);
  const hasFavorites =
    favorites.news.length || favorites.movies.length || favorites.social.length;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {!hasFavorites && (
        <div>No favorites yet. Mark content as favorite to see it here!</div>
      )}
      {favorites.news.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">News</h2>
          <div className="grid gap-4">
            {favorites.news.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        </section>
      )}
      {favorites.movies.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Movies</h2>
          <div className="grid gap-4">
            {favorites.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
      {favorites.social.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Social Posts</h2>
          <div className="grid gap-4">
            {favorites.social.map((post) => (
              <SocialCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
