"use client";
import { useState, useEffect } from "react";
import { getApiStatus } from "../utils/apiValidation";

export default function ApiStatusBanner() {
  const [apiStatus, setApiStatus] = useState(getApiStatus());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setApiStatus(getApiStatus());
    setIsVisible(!apiStatus.isValid);
  }, [apiStatus.isValid]);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            API Configuration Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            <p className="mb-2">{apiStatus.message}</p>
            <div className="space-y-1">
              {!apiStatus.hasNewsApi && (
                <p>
                  •{" "}
                  <a
                    href="https://newsapi.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Get News API key
                  </a>
                </p>
              )}
              {!apiStatus.hasTmdbApi && (
                <p>
                  •{" "}
                  <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Get TMDB API key
                  </a>
                </p>
              )}
            </div>
            <p className="mt-2 text-xs">
              Add your API keys to{" "}
              <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">
                .env.local
              </code>{" "}
              file
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
