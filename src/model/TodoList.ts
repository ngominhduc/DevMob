import { TodoItem } from "./TodoItem";

export interface TodoList {
    uuid : string,
    name : string,
    imgURL? : string,
    shareto : string[],
    items : TodoItem[]
  }
