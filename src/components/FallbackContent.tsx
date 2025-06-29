"use client";
import { motion } from "framer-motion";

interface FallbackContentProps {
  type: "news" | "movies" | "social";
  error?: string;
}

const fallbackData = {
  news: [
    {
      title: "Sample Technology News",
      description:
        "This is a sample news article about the latest in technology. In a real scenario, this would be fetched from the News API.",
      url: "#",
      urlToImage: "",
      publishedAt: new Date().toISOString(),
      source: { name: "Sample News" },
    },
    {
      title: "Sample Sports News",
      description:
        "This is a sample sports article. The News API would provide real-time sports updates here.",
      url: "#",
      urlToImage: "",
      publishedAt: new Date().toISOString(),
      source: { name: "Sample Sports" },
    },
  ],
  movies: [
    {
      id: 1,
      title: "Sample Movie Title",
      overview:
        "This is a sample movie description. The TMDB API would provide real movie recommendations here.",
      poster_path: "",
      release_date: "2024-01-01",
    },
    {
      id: 2,
      title: "Another Sample Movie",
      overview:
        "Another sample movie description showcasing what the TMDB API would provide.",
      poster_path: "",
      release_date: "2024-01-15",
    },
  ],
  social: [
    {
      id: "1",
      username: "sample_user",
      avatar: "",
      content:
        "This is a sample social media post. In a real scenario, this would be fetched from a social media API.",
      image: "",
      createdAt: new Date().toISOString(),
      hashtag: "sample",
    },
    {
      id: "2",
      username: "another_user",
      avatar: "",
      content:
        "Another sample social media post showing what real social media content would look like.",
      image: "",
      createdAt: new Date().toISOString(),
      hashtag: "demo",
    },
  ],
};

export default function FallbackContent({ type, error }: FallbackContentProps) {
  const data = fallbackData[type];

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">⚠️</span>
            <span className="text-sm text-red-800 dark:text-red-200">
              {error}
            </span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Sample Content
          </span>
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          This is sample {type} content. Configure your API keys to see real
          data.
        </p>
      </div>

      <div className="grid gap-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            {type === "news" && (
              <>
                <div className="font-bold text-lg">{(item as typeof fallbackData.news[0]).title}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {(item as typeof fallbackData.news[0]).description}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Source: {(item as typeof fallbackData.news[0]).source.name}
                </div>
              </>
            )}

            {type === "movies" && (
              <>
                <div className="font-bold text-lg">{(item as typeof fallbackData.movies[0]).title}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {(item as typeof fallbackData.movies[0]).overview}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Release: {(item as typeof fallbackData.movies[0]).release_date}
                </div>
              </>
            )}

            {type === "social" && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <span className="font-semibold">@{(item as typeof fallbackData.social[0]).username}</span>
                </div>
                <div className="text-sm">{(item as typeof fallbackData.social[0]).content}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
