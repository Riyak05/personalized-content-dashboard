"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    return (
      <div className="text-center py-12">
        You must be signed in to view your profile.
      </div>
    );
  }
  const { user } = session;
  return (
    <div className="max-w-lg mx-auto py-12">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.image || "/avatar1.png"}
          alt={user?.name || "User"}
          className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-700"
        />
        <div className="text-2xl font-bold">{user?.name || "No Name"}</div>
        <div className="text-gray-600 dark:text-gray-400">{user?.email}</div>
      </div>
    </div>
  );
}
