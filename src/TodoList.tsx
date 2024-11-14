import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faFaceGrinWide,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todos: Todo[];
};

const num2star = (n: number): string => "★".repeat(4 - n);

const TodoList = (props: Props) => {
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>
            {todo.name} 優先度: {todo.priority}
          </div>
          <div className="ml-2 text-orange-400">
            {num2star(todo.priority)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;