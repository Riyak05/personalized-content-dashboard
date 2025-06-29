export const validateApiKeys = () => {
  const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const errors: string[] = [];

  if (!newsApiKey || newsApiKey === "your_news_api_key_here") {
    errors.push("News API key is missing or not configured");
  }

  if (!tmdbApiKey || tmdbApiKey === "your_tmdb_api_key_here") {
    errors.push("TMDB API key is missing or not configured");
  }

  return {
    isValid: errors.length === 0,
    errors,
    hasNewsApi: !!newsApiKey && newsApiKey !== "your_news_api_key_here",
    hasTmdbApi: !!tmdbApiKey && tmdbApiKey !== "your_tmdb_api_key_here",
  };
};

export const getApiStatus = () => {
  const validation = validateApiKeys();

  return {
    ...validation,
    message: validation.isValid
      ? "All APIs are configured"
      : `Missing API keys: ${validation.errors.join(", ")}`,
  };
};
