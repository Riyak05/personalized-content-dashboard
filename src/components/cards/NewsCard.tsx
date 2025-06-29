"use client";
import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { NewsArticle } from "../../services/newsApi";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favorites/favoritesSlice";
import { motion } from "framer-motion";

export default function NewsCard({ article }: { article: NewsArticle }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.news);
  const isFavorite = favorites.some((fav) => fav.url === article.url);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="rounded max-h-40 object-cover mb-2"
        />
      )}
      <div className="font-bold text-lg">{article.title}</div>
      <div className="text-sm text-gray-500">{article.description}</div>
      <div className="flex gap-2 mt-2">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          Read More
        </a>
        <button
          className={`ml-auto px-3 py-1 rounded ${
            isFavorite
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite({ type: "news", item: article }))
              : dispatch(addFavorite({ type: "news", item: article }))
          }
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </motion.div>
  );
}
