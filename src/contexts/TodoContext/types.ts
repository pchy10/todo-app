export type TodoStatus = "pending" | "completed" | "active"; // default: "pending"

export enum ChangeTodoType {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_COMPLETED = "SET_COMPLETED",
}

export interface ITodoInput {
  title: string;
  status?: TodoStatus;
  id?: number;
}

export interface ITodo {
  id: number;
  title: string;
  status?: TodoStatus;
}

export interface IChangeTodoArgs {
  type: ChangeTodoType;
  todo: ITodoInput;
}

export interface ITodoContext {
  todos: ITodo[];
  changeTodo?: (args: IChangeTodoArgs) => void;
}
