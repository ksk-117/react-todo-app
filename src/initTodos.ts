import { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート

export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "化学の課題",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 10, 22),
    memo: "",
  },

  {
    id: uuid(),
    name: "物理の課題",
    isDone: false,
    priority: 3,
    deadline: new Date(2024, 11, 2),
    memo: "",
  },
    
  {
    id: uuid(),
    name: "プログラミング3の課題1",
    isDone: false,
    priority: 3,
    deadline: new Date(2024, 10, 27),
    memo: "https://classroom.google.com/c/NzA2ODk3OTU3MzYy/a/NzMxMzA0OTY0MDk2/details",
  },

  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "解析2の宿題",
    isDone: false,
    priority: 2,
    deadline: new Date(2024, 10, 25, 17, 30),
    memo: ""
  },

  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: true,
    priority: 1,
    deadline: null,
    memo: "TypeScriptの基本文法を復習する",
  },
];