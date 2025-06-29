"use client";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toggleDarkMode } from "../features/preferences/preferencesSlice";

export default function ThemeToggle() {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label="Toggle dark mode"
      className="p-2 rounded focus:outline-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
