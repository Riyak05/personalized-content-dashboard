"use client";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { SocialPost } from "../../services/socialApi";
import {
  addFavorite,
  removeFavorite,
} from "../../features/favorites/favoritesSlice";
import { motion } from "framer-motion";

export default function SocialCard({ post }: { post: SocialPost }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.social);
  const isFavorite = favorites.some((fav) => fav.id === post.id);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2 card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img
          src={post.avatar}
          alt={post.username}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold">@{post.username}</span>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <div>{post.content}</div>
      {post.image && (
        <img
          src={post.image}
          alt="Social post"
          className="my-2 rounded max-h-40 object-cover"
        />
      )}
      <div className="flex gap-2 mt-2">
        <button
          className={`ml-auto px-3 py-1 rounded ${
            isFavorite
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite({ type: "social", item: post }))
              : dispatch(addFavorite({ type: "social", item: post }))
          }
        >
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </motion.div>
  );
}
