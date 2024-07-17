"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthProvider";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { signOut } from "firebase/auth";
import { auth } from "./lib/firebase";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Todo List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <AddTodo />
      <div className="mt-8">
        <TodoList />
      </div>
    </div>
  );
}
