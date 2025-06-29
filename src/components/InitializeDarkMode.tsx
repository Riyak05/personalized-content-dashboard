"use client";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { initializeDarkMode } from "../features/preferences/preferencesSlice";

export default function InitializeDarkMode() {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const dispatch = useAppDispatch();

  // On mount, initialize Redux from localStorage
  useEffect(() => {
    dispatch(initializeDarkMode());
  }, [dispatch]);

  // On every darkMode change, update the <html> and <body> classes
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (darkMode) {
      htmlElement.classList.add("dark");
      bodyElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
      bodyElement.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
}
