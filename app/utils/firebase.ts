// app/utils/firebase.ts

import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const addTodo = async (text: string) => {
  try {
    await addDoc(collection(db, "todos"), {
      text,
      completed: false,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding todo: ", error);
  }
};

export const toggleTodo = async (id: string, completed: boolean) => {
  try {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !completed });
  } catch (error) {
    console.error("Error toggling todo: ", error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    console.error("Error deleting todo: ", error);
  }
};

export const subscribeToTodos = (callback: (todos: Todo[]) => void) => {
  const q = query(collection(db, "todos"));
  return onSnapshot(q, (querySnapshot) => {
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() } as Todo);
    });
    callback(todos);
  });
};
