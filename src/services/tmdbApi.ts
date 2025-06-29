import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    validateStatus: (response) => {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key. Please check your TMDB API configuration."
        );
      }
      if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (response.status >= 500) {
        throw new Error("TMDB API service is currently unavailable.");
      }
      return response.status < 300;
    },
  }),
  endpoints: (builder) => ({
    getRecommendations: builder.query<
      Movie[],
      { genreId?: number; page?: number } | void
    >({
      query: ({ genreId, page = 1 } = {}) => {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        if (!apiKey || apiKey === "your_tmdb_api_key_here") {
          throw new Error("TMDB API key is not configured");
        }
        return `movie/popular?api_key=${apiKey}${
          genreId ? `&with_genres=${genreId}` : ""
        }&page=${page}`;
      },
      transformResponse: (response: { results: Movie[] }) => response.results,
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 401) {
          return "Invalid API key. Please check your TMDB API configuration.";
        }
        if (response.status === 429) {
          return "API rate limit exceeded. Please try again later.";
        }
        return "Failed to fetch movies. Please try again later.";
      },
    }),
  }),
});

export const { useGetRecommendationsQuery } = tmdbApi;
