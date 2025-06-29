import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "health";

interface PreferencesState {
  categories: Category[];
  darkMode: boolean;
}

const initialState: PreferencesState = {
  categories: ["technology", "sports"],
  darkMode: false, // always false initially
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
      }
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
      }
    },
    initializeDarkMode(state) {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("darkMode");
        state.darkMode = stored !== null ? JSON.parse(stored) : false;
      }
    },
  },
});

export const {
  setCategories,
  toggleDarkMode,
  setDarkMode,
  initializeDarkMode,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
