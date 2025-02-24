import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { getAPI } from "@/services/fetchApi";

function Todos({ todos, setTodos }) {           
  const getAllTodos = async () => {
    try {
      const data = await getAPI("/todos/getTodos");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      {Array.isArray(todos) > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
          {todos.map((todo, index) =>
            todo && todo.title && todo.content ? (
              <div key={index}>
                <TodoCard todo={todo} setTodos={setTodos} />
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </>
  );
}

export default Todos;
