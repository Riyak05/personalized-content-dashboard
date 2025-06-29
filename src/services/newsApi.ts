import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
    validateStatus: (response) => {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key. Please check your News API configuration."
        );
      }
      if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      if (response.status >= 500) {
        throw new Error("News API service is currently unavailable.");
      }
      return response.status < 300;
    },
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      NewsArticle[],
      { category: string; page?: number } | void
    >({
      query: ({ category, page = 1 } = { category: "technology", page: 1 }) => {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        if (!apiKey || apiKey === "your_news_api_key_here") {
          throw new Error("News API key is not configured");
        }
        return `top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`;
      },
      transformResponse: (response: { articles: NewsArticle[] }) =>
        response.articles,
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 401) {
          return "Invalid API key. Please check your News API configuration.";
        }
        if (response.status === 429) {
          return "API rate limit exceeded. Please try again later.";
        }
        return "Failed to fetch news. Please try again later.";
      },
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = newsApi;
