import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ErrorBoundary from "../components/ErrorBoundary";
import SessionProviders from "./SessionProviders";
import InitializeDarkMode from "../components/InitializeDarkMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personalized Content Dashboard",
  description: "A modern dashboard for personalized news, movies, and social feeds. Built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <AppProviders>
          <InitializeDarkMode />
          <SessionProviders>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1 p-6 bg-white dark:bg-gray-950">
        {children}
                  </main>
                </div>
              </div>
            </ErrorBoundary>
          </SessionProviders>
        </AppProviders>
      </body>
    </html>
  );
}
