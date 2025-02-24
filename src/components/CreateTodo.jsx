"use client";
import { useState } from "react";

import { postAPI } from "@/services/fetchApi";
import Todos from "./Todos";

function CreateTodo() {
  const [newTodo, setNewTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createTodo = async () => {
    try {
      setIsLoading(true);
      const data = await postAPI("/todos/createTodo", newTodo);
      if (data.success) {
        console.log("Todo added successfully");
      } else {
        console.error(`Todo could not be added: ${data.error}`);
      }
      setTodos((prevTodos) =>
        Array.isArray(prevTodos) ? [...prevTodos, data] : [data]
      );
      setNewTodo({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4  ">
      <div className="w-full max-w-lg space-y-4 p-12 border border-gray-300">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="text"
          placeholder="Content"
          value={newTodo.content}
          onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={createTodo}
          className="w-full p-2 bg-primary-500 text-white rounded-md bg-black border-2 border-primary-500 hover:bg-primary-600 hover:border-primary-600 transition"
        >
          ADD
        </button>
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <Todos todos={todos} setTodos={setTodos} />
      )}
    </div>
  );
}

export default CreateTodo;
