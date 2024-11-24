import { useState } from "react";
import { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal"; // モーダルコンポーネントをインポート

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [newTodomemo, setNewTodomemo] = useState("");
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;

  const isValidTodoName = (name: string): string => {
    if (name.length < 2 || name.length > 32) {
      return "2文字以上、32文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
      memo: newTodomemo,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setIsModalOpen(false); // タスク追加後にモーダルを閉じる
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto text-white">
      <h1 className="mb-4 text-2xl font-extrabold">TodoApp</h1>
      
      <button
        type="button"
        onClick={() =>
          setTodos([...todos].sort((a, b) => {
            if (a.deadline === null) return 1;
            if (b.deadline === null) return -1;
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          }))
        }
        className="rounded-md border bg-gray-900 px-3 py-1 font-bold text-white hover:bg-gray-600"
      >
        ↓期限順にソート
      </button>

      <button
        type="button"
        onClick={() =>
          setTodos([...todos].sort((a, b) => b.priority - a.priority)
        )}
        className="rounded-md border bg-gray-900 px-3 py-1 font-bold text-white hover:bg-gray-600 mx-2"
      >
        ↓優先度順にソート
      </button>
      
      <button
        type="button"
        onClick={() => setIsModalOpen(true)} // モーダルを開く
        className="mt-5 rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600 mx-2"
      >
        新しいタスクの追加
      </button>
      
      <button
        type="button"
        onClick={removeCompletedTodos}
        className="mt-5 rounded-md bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600"
      >
        完了済みのタスクを削除
      </button>

      <div className="py-4">
        <TodoList todos={todos} updateIsDone={updateIsDone} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="my-3 space-y-2 rounded-md border p-3">
          <h2 className="text-lg font-bold">新しいタスクの追加</h2>
          <div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="newTodoName">
                名前
              </label>
              <input
                id="newTodoName"
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                className={twMerge(
                  "grow rounded-md border p-2 text-black",
                  newTodoNameError && "border-red-500 outline-red-500"
                )}
                placeholder="2文字以上、32文字以内で入力してください"
              />
            </div>
            {newTodoNameError && (
              <div className="ml-10 flex items-center space-x-1 text-sm font-bold text-red-500 ">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-0.5"
                />
                <div>{newTodoNameError}</div>
              </div>
            )}
          </div>

          <div className="flex gap-5">
            <div className="font-bold">優先度</div>
            {[1, 2, 3].map((value) => (
              <label key={value} className="flex items-center space-x-1">
                <input
                  id={`priority-${value}`}
                  name="priorityGroup"
                  type="radio"
                  value={value}
                  checked={newTodoPriority === value}
                  onChange={updateNewTodoPriority}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <label htmlFor="deadline" className="font-bold">
              期限
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={
                newTodoDeadline
                  ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                  : ""
              }
              onChange={updateDeadline}
              className="rounded-md border border-gray-400 px-2 py-0.5 text-black"
            />
          </div>

          <button 
            type="button"
            onClick={addNewTodo}
            className={twMerge(
              "rounded-md bg-indigo-500 px-3 py-1 font-bold text-white hover:bg-indigo-600",
              newTodoNameError && "cursor-not-allowed opacity-50"
            )}
          >
            追加
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-md bg-gray-500 px-3 py-1 font-bold text-white hover:bg-gray-600 ml-2"
          >
            キャンセル
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;