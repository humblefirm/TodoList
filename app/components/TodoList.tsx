"use client";

import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import {
  Todo,
  subscribeToTodos,
  toggleTodo,
  deleteTodo,
} from "../utils/firebase";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTodos(setTodos);
    return () => unsubscribe();
  }, []);

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleTodo(id, completed);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
