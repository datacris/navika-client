"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import {
  addTodo,
  removeTodo,
  toggleTodo,
} from "@/src/redux/features/todo-slice";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Checkbox } from "@mui/material";

const initialState = {
  id: 0,
  name: "",
  done: false,
};
const randomInt = async (min: any, max: any) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Todo = () => {
  const [entry, setEntry] = useState(initialState);
  const { list } = useSelector((state: RootState) => state.todoReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = await randomInt(0, 1000);
    setEntry({ ...entry, id: newId });
    dispatch(addTodo(entry));
  };

  return (
    <div className="p-10">
      {list.map((todo) => (
        <div className="flex mb-2 justify-between" key={todo.id}>
          <div>
            <p>{todo.name}</p>
          </div>

          <div className="flex space-x-1">
            <div className="my-auto">
              <Checkbox
                checked={todo.done}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
            </div>

            <div className="my-auto">
              <TrashIcon
                className="h-7 w-7 text-blue-800"
                onClick={() => dispatch(removeTodo(todo.id))}
              />
            </div>
          </div>
        </div>
      ))}
      <form>
        <input
          className="bg-gray-300 border-blue-100"
          type="text"
          value={entry.name}
          onChange={(e) => setEntry({ ...entry, name: e.target.value })}
        />
        <button onClick={(e) => handleSend(e)}>Add task</button>
      </form>
    </div>
  );
};

export default Todo;
