import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void; // ◀◀ 追加
};

const num2star = (n: number): string => "★".repeat(n);

const today = dayjs();
const oneDayBefore = today.subtract(1, 'day');
const oneDayAfter = today.add(1, 'day');

const isLink = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch (_) {
    return false;
  }
};

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
        <div
          key={todo.id}
          className={twMerge(
            "rounded-lg border border-white bg-gray-700 px-4 py-2 drop-shadow-lg",
            dayjs(todo.deadline).isBefore(oneDayBefore) && "bg-yellow-100 text-red-500",
            dayjs(todo.deadline).isBefore(oneDayAfter) && dayjs(todo.deadline).isAfter(oneDayBefore) && "bg-yellow-100 text-yellow-800",
            todo.isDone && "bg-gray-200 opacity-50 text-gray-500"
          )}
        >
          <div>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
              className="mr-1.5 cursor-pointer"
            />
            <span className="text-lg font-bold">
              {todo.name}
            </span>
            <span className="ml-2 text-orange-400">
              {num2star(todo.priority)}
            </span>
            <button
              onClick={() => props.remove(todo.id)}
              className="ml-auto justify-end rounded-md px-2 py-1 font-bold hover:text-red-200"
            >
              ✘
            </button>
            <div>
              {
                todo.deadline ? (dayjs(todo.deadline).isBefore(dayjs()) ?
                (dayjs(todo.deadline).format("期限切れ: YYYY年M月D日 H時m分")) :
                (dayjs(todo.deadline).format("期限: YYYY年M月D日 H時m分"))) :
                ("期限なし")
              }
            </div>
            <div>
              {todo.memo ? (
                <div className="mt-2">
                  <hr className="border-t border-black" />
                  <div className="mt-2 text-white-400">
                    {isLink(todo.memo) ? (
                      <a
                        href={todo.memo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white-400"
                      >
                        <FontAwesomeIcon icon={faFile} /> {todo.memo}
                      </a>
                    ) : (
                      <p>{todo.memo}</p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;