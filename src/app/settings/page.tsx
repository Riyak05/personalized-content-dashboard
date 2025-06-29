"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [avatar, setAvatar] = useState(session?.user?.image || "");

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    return (
      <div className="text-center py-12">
        You must be signed in to view settings.
      </div>
    );
  }

  // Placeholder for update logic
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile update is not implemented in this demo.");
  };

  return (
    <div className="max-w-lg mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Avatar URL</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-4 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
