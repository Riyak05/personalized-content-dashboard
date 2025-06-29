"use client";
import { useGetTopHeadlinesQuery } from "../../services/newsApi";
import { useGetRecommendationsQuery } from "../../services/tmdbApi";
import { useGetPostsQuery } from "../../services/socialApi";
import NewsCard from "../../components/cards/NewsCard";
import MovieCard from "../../components/cards/MovieCard";
import SocialCard from "../../components/cards/SocialCard";

export default function TrendingPage() {
  const { data: news, isLoading: newsLoading } = useGetTopHeadlinesQuery({
    category: "technology",
  });
  const { data: movies, isLoading: moviesLoading } =
    useGetRecommendationsQuery();
  const { data: posts, isLoading: postsLoading } = useGetPostsQuery();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-4">Trending</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Trending News</h2>
        {newsLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4">
            {news?.slice(0, 5).map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Trending Movies</h2>
        {moviesLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4">
            {movies?.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Trending Social Posts</h2>
        {postsLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4">
            {posts?.slice(0, 5).map((post) => (
              <SocialCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
