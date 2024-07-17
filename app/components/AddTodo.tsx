"use client";

import React, { useState } from "react";
import { addTodo } from "../utils/firebase";

export default function AddTodo() {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    await addTodo(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
}
