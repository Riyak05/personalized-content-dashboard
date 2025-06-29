import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SocialPost {
  id: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  createdAt: string;
  hashtag?: string;
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    username: "Ankit",
    avatar: "/image/img1.png",
    content:
      "🚀 Just personalized my dashboard feed—now I get all my favorite news, movies, and tech updates in one place! Highly recommend this app! #ProductivityWin",
    createdAt: new Date().toISOString(),
    hashtag: "dashboard",
  },
  {
    id: "2",
    username: "Anita",
    avatar: "/image/img2.png",
    content:
      "✨ The dark mode on this dashboard is so smooth! My eyes are thanking me during late-night coding sessions. #DarkMode #NextJS",
    image: "",
    createdAt: new Date().toISOString(),
    hashtag: "nextjs",
  },
];

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: async () => ({ data: mockPosts }),
  endpoints: (builder) => ({
    getPosts: builder.query<SocialPost[], { hashtag?: string } | void>({
      query: () => "",
      // Filtering by hashtag if provided
      transformResponse: (response: SocialPost[], meta, arg) => {
        if (arg?.hashtag) {
          return response.filter((post) => post.hashtag === arg.hashtag);
        }
        return response;
      },
    }),
  }),
});

export const { useGetPostsQuery } = socialApi;
