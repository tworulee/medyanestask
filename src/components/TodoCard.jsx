"use client";
import { deleteAPI, putAPI } from "@/services/fetchApi";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";

function TodoCard({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false); 
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    content: todo.content,
  });

  const updateTodo = async (id) => {
    try {
      const data = await putAPI(`/todos/updateTodo/?id=${todo.id}`, {
        title: editedTodo.title,
        content: editedTodo.content,
      });

      if (data.success) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, ...editedTodo } : todo
          )
        );
        console.log("Todo başarıyla güncellendi.");
        setIsEditing(false);
      } else {
        console.error("Updating failed:", data.error);
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteAPI(`/todos/deleteTodo?id=${todo.id}`);
      console.log("Todo başarıyla silindi.");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto border border-gray-300">
  <div className="mb-6">
    <input
      type="text"
      value={editedTodo.title}
      onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
      placeholder="Edit Title"
    />
  </div>

  <div className="mb-6">
    <textarea
      value={editedTodo.content}
      onChange={(e) => setEditedTodo({ ...editedTodo, content: e.target.value })}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      placeholder="Edit Content"
    />
  </div>

  <div className="flex justify-between items-center">
    <div className="flex space-x-4">
      <button
        onClick={() => updateTodo(todo.id)}
        className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        <IoMdCheckmark />
      </button>
      <button
        onClick={() => setIsEditing(false)}
        className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <LuDelete />
      </button>
    </div>

    <div>
      <p className="text-sm text-gray-500">{todo.updatedAt.slice(0, 10)}</p>
    </div>
  </div>
</div>

    );
  }

  return (
    <div
      key={todo.id}
      className="bg-white shadow-lg rounded-lg p-8 mb-6 max-w-lg mx-auto border border-gray-300"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{todo.title}</h2>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">{todo.content}</p>
      </div>

      <div className="flex justify-between items-start space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FaPen />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <MdDeleteForever />
          </button>
        </div>

        <div className="w-full mt-2">
          <p className="text-sm text-gray-500 text-right">
            {todo.createdAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
