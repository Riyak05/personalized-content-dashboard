import { configureStore } from "@reduxjs/toolkit";
// import { api } from '../services/api'; // RTK Query API placeholder
import preferencesReducer from "./preferences/preferencesSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import searchReducer from "./search/searchSlice";
import { newsApi } from "../services/newsApi";
import { tmdbApi } from "../services/tmdbApi";
import { socialApi } from "../services/socialApi";
import { setSearchQuery } from "../features/search/searchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "preferences"],
};

const rootReducer = {
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  search: searchReducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(newsApi.middleware, tmdbApi.middleware, socialApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
