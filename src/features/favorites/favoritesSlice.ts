import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsArticle } from "../../services/newsApi";
import { Movie } from "../../services/tmdbApi";
import { SocialPost } from "../../services/socialApi";

interface FavoritesState {
  news: NewsArticle[];
  movies: Movie[];
  social: SocialPost[];
}

const initialState: FavoritesState = {
  news: [],
  movies: [],
  social: [],
};

type FavoriteType = "news" | "movies" | "social";
type FavoriteItem = NewsArticle | Movie | SocialPost;
interface AddRemovePayload {
  type: FavoriteType;
  item: FavoriteItem;
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<AddRemovePayload>) {
      if (action.payload.type === "news") {
        state.news.push(action.payload.item as NewsArticle);
      } else if (action.payload.type === "movies") {
        state.movies.push(action.payload.item as Movie);
      } else if (action.payload.type === "social") {
        state.social.push(action.payload.item as SocialPost);
      }
    },
    removeFavorite(state, action: PayloadAction<AddRemovePayload>) {
      if (action.payload.type === "news") {
        state.news = state.news.filter(
          (fav) => fav.url !== (action.payload.item as NewsArticle).url
        );
      } else if (action.payload.type === "movies") {
        state.movies = state.movies.filter(
          (fav) => fav.id !== (action.payload.item as Movie).id
        );
      } else if (action.payload.type === "social") {
        state.social = state.social.filter(
          (fav) => fav.id !== (action.payload.item as SocialPost).id
        );
      }
    },
    setFavorites(state, action: PayloadAction<FavoritesState>) {
      return action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
