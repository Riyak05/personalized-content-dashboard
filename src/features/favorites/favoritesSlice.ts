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

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(
      state,
      action: PayloadAction<{ type: "news" | "movies" | "social"; item: any }>
    ) {
      state[action.payload.type].push(action.payload.item);
    },
    removeFavorite(
      state,
      action: PayloadAction<{ type: "news" | "movies" | "social"; item: any }>
    ) {
      state[action.payload.type] = state[action.payload.type].filter(
        (fav: any) => {
          if (action.payload.type === "news")
            return fav.url !== action.payload.item.url;
          if (action.payload.type === "movies")
            return fav.id !== action.payload.item.id;
          if (action.payload.type === "social")
            return fav.id !== action.payload.item.id;
          return true;
        }
      );
    },
    setFavorites(state, action: PayloadAction<FavoritesState>) {
      return action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
