"use client";

import { useAppSelector } from "../hooks/useAppSelector";
import { useGetTopHeadlinesQuery } from "../services/newsApi";
import { useGetRecommendationsQuery } from "../services/tmdbApi";
import { useGetPostsQuery } from "../services/socialApi";
import NewsCard from "./cards/NewsCard";
import MovieCard from "./cards/MovieCard";
import SocialCard from "./cards/SocialCard";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from "react";
import ApiStatusBanner from "./ApiStatusBanner";
import FallbackContent from "./FallbackContent";
import { getApiStatus } from "../utils/apiValidation";
import axios from "axios";
import type { NewsArticle } from "../services/newsApi";
import type { Movie } from "../services/tmdbApi";
import type { SocialPost } from "../services/socialApi";

function DraggableCard({
  id,
  index,
  moveCard,
  children,
}: {
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
}

function interleave<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  const result: (T | U)[] = [];
  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++) {
    if (arr1[i]) result.push(arr1[i]);
    if (arr2[i]) result.push(arr2[i]);
  }
  return result;
}

function isNewsArticle(
  item: NewsArticle | Movie | SocialPost
): item is NewsArticle {
  return (
    typeof item === "object" &&
    "title" in item &&
    "description" in item &&
    "url" in item &&
    "source" in item
  );
}

function isMovie(item: NewsArticle | Movie | SocialPost): item is Movie {
  return (
    typeof item === "object" &&
    "title" in item &&
    "overview" in item &&
    "poster_path" in item &&
    "release_date" in item
  );
}

function isSocialPost(
  item: NewsArticle | Movie | SocialPost
): item is SocialPost {
  return (
    typeof item === "object" &&
    "username" in item &&
    "content" in item &&
    "createdAt" in item
  );
}

function alternateNewsAndMovies(
  news: NewsArticle[],
  movies: Movie[]
): (NewsArticle | Movie)[] {
  const result: (NewsArticle | Movie)[] = [];
  const maxLength = Math.max(news.length, movies.length);
  for (let i = 0; i < maxLength; i++) {
    if (news[i]) result.push(news[i]);
    if (movies[i]) result.push(movies[i]);
  }
  return result;
}

const categoryToGenreId: Record<string, number> = {
  technology: 878, // Science Fiction
  sports: 28, // Action
  finance: 18, // Drama
  entertainment: 35, // Comedy
  health: 99, // Documentary
};

export default function ContentFeed() {
  const categories = useAppSelector((state) => state.preferences.categories);
  const [newsPage, setNewsPage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [feed, setFeed] = useState<(NewsArticle | Movie | SocialPost)[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);
  const searchQuery = useAppSelector((state) =>
    state.search.query.toLowerCase()
  );

  const apiStatus = getApiStatus();
  const hasValidApis = apiStatus.isValid;

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  // Fetch news for all selected categories in a single effect
  useEffect(() => {
    let cancelled = false;
    async function fetchAllNews() {
      setLoadingNews(true);
      setNewsError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        if (!apiKey || apiKey === "your_news_api_key_here") {
          setNewsError("News API key is not configured");
          setAllNews([]);
          setLoadingNews(false);
          return;
        }
        const requests = categories.map((category) =>
          axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${newsPage}&apiKey=${apiKey}`
          )
        );
        const responses = await Promise.all(requests);
        const articles = responses.flatMap((res) => res.data.articles);
        if (!cancelled) setAllNews(articles);
      } catch (err) {
        if (!cancelled) setNewsError("Failed to fetch news.");
        if (!cancelled) setAllNews([]);
      } finally {
        if (!cancelled) setLoadingNews(false);
      }
    }
    if (categories.length > 0) {
      fetchAllNews();
    } else {
      setAllNews([]);
    }
    return () => {
      cancelled = true;
    };
  }, [categories, newsPage]);

  // Fetch movies for all selected categories in a single effect
  useEffect(() => {
    let cancelled = false;
    async function fetchAllMovies() {
      setLoadingMovies(true);
      setMoviesError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        if (!apiKey || apiKey === "your_tmdb_api_key_here") {
          setMoviesError("TMDB API key is not configured");
          setAllMovies([]);
          setLoadingMovies(false);
          return;
        }
        const genreIds = categories
          .map((cat) => categoryToGenreId[cat])
          .filter(Boolean);
        const requests = genreIds.map((genreId) =>
          axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${moviePage}`
          )
        );
        const responses = await Promise.all(requests);
        // Combine and deduplicate movies by id
        const movies = responses.flatMap((res) => res.data.results);
        const uniqueMovies = Array.from(
          new Map(movies.map((m) => [m.id, m])).values()
        );
        if (!cancelled) setAllMovies(uniqueMovies);
      } catch (err) {
        if (!cancelled) setMoviesError("Failed to fetch movies.");
        if (!cancelled) setAllMovies([]);
      } finally {
        if (!cancelled) setLoadingMovies(false);
      }
    }
    if (categories.length > 0) {
      fetchAllMovies();
    } else {
      setAllMovies([]);
    }
    return () => {
      cancelled = true;
    };
  }, [categories, moviePage]);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetPostsQuery();

  const isLoading = loadingNews || loadingMovies || postsLoading;
  const hasErrors =
    Boolean(newsError) || Boolean(moviesError) || Boolean(postsError);

  // Show fallback content if APIs are not configured
  if (!hasValidApis) {
    return (
      <div className="space-y-6">
        <ApiStatusBanner />
        <div className="grid gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">News</h2>
            <FallbackContent type="news" />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Movies</h2>
            <FallbackContent type="movies" />
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Social Posts</h2>
            <FallbackContent type="social" />
          </section>
        </div>
      </div>
    );
  }

  // Show error states if APIs fail
  if (hasErrors) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">⚠️</span>
            <span className="text-sm text-red-800 dark:text-red-200">
              Some content failed to load. Please try again later.
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {Boolean(newsError) && (
            <section>
              <h2 className="text-xl font-semibold mb-4">News</h2>
              <FallbackContent
                type="news"
                error="News API is currently unavailable"
              />
            </section>
          )}
          {Boolean(moviesError) && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Movies</h2>
              <FallbackContent
                type="movies"
                error="Movie API is currently unavailable"
              />
            </section>
          )}
          {Boolean(postsError) && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Social Posts</h2>
              <FallbackContent
                type="social"
                error="Social API is currently unavailable"
              />
            </section>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const mixedFeed = alternateNewsAndMovies(allNews, allMovies);
    setFeed([...mixedFeed, ...(posts || [])]);
    if (
      allNews &&
      allNews.length === 0 &&
      allMovies &&
      allMovies.length === 0
    ) {
      setHasMore(false);
    }
  }, [allNews, allMovies, posts]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNewsPage((prev) => prev + 1);
          setMoviePage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);

  // Filter feed by search query
  const filteredFeed = !searchQuery
    ? feed
    : feed.filter((item) => {
        if (
          isNewsArticle(item) &&
          item.title.toLowerCase().includes(searchQuery)
        )
          return true;
        if (
          isNewsArticle(item) &&
          item.description?.toLowerCase().includes(searchQuery)
        )
          return true;
        if (isMovie(item) && item.title.toLowerCase().includes(searchQuery))
          return true;
        if (isMovie(item) && item.overview?.toLowerCase().includes(searchQuery))
          return true;
        if (
          isSocialPost(item) &&
          item.content?.toLowerCase().includes(searchQuery)
        )
          return true;
        return false;
      });

  // Drag-and-drop reorder logic
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setFeed((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      return updated;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-6">
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <span className="loader" />
          </div>
        )}
        {!isLoading && filteredFeed.length === 0 && (
          <div>No content available.</div>
        )}
        <AnimatePresence>
          {!isLoading &&
            filteredFeed.map((item, idx) => {
              const cardId =
                ("url" in item && item.url) || ("id" in item && item.id) || idx;
              let cardContent = null;
              if ("title" in item && "url" in item) {
                cardContent = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NewsCard article={item} />
                  </motion.div>
                );
              } else if ("title" in item && "poster_path" in item) {
                cardContent = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MovieCard movie={item} />
                  </motion.div>
                );
              } else if ("username" in item) {
                cardContent = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SocialCard post={item} />
                  </motion.div>
                );
              }
              return (
                <DraggableCard
                  key={cardId}
                  id={String(cardId)}
                  index={idx}
                  moveCard={moveCard}
                >
                  {cardContent}
                </DraggableCard>
              );
            })}
        </AnimatePresence>
        {hasMore && <div ref={loader} className="h-8" />}
        {!hasMore && (
          <div className="text-center text-gray-400">No more content.</div>
        )}
      </div>
    </DndProvider>
  );
}
