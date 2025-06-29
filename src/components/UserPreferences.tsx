"use client";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCategories } from "../features/preferences/preferencesSlice";
import { useState } from "react";

const availableCategories = [
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "health", label: "Health", icon: "🏥" },
];

export default function UserPreferences() {
  const dispatch = useAppDispatch();
  const currentCategories = useAppSelector(
    (state) => state.preferences.categories
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = currentCategories.includes(categoryId as any)
      ? currentCategories.filter((cat) => cat !== categoryId)
      : [...currentCategories, categoryId as any];

    dispatch(setCategories(newCategories));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        <span>⚙️</span>
        <span>Preferences</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 z-50">
          <h3 className="text-lg font-semibold mb-4">Content Preferences</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select your favorite content categories to personalize your feed.
          </p>

          <div className="space-y-3">
            {availableCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={currentCategories.includes(category.id as any)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm">{category.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500">
              Selected: {currentCategories.length} categories
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
