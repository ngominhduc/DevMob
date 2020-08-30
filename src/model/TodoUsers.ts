import { TodoList } from "./TodoList";

export interface TodoUsers {
    uuid : string,
    name : string,
    email : string,
    lists : TodoList[]
  }