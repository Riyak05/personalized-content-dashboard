import React from "react";

const navItems = [
  { label: "Feed", href: "/" },
  { label: "Trending", href: "/trending" },
  { label: "Favorites", href: "/favorites" },
];

export default function Sidebar() {
  return (
    <aside className="h-full w-56 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col py-8 px-4 gap-4">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition text-gray-900 dark:text-gray-100"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
