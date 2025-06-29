"use client";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSearchQuery } from "../features/search/searchSlice";
import UserPreferences from "./UserPreferences";
import UserMenu from "./UserMenu";

export default function Header() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  // Debounced dispatch
  const debouncedSearch = debounce((value: string) => {
    dispatch(setSearchQuery(value));
  }, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
          className="w-full max-w-md px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring"
        />
      </div>
      <div className="flex items-center gap-4">
        <UserPreferences />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
