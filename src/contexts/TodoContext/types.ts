export type TodoStatus = "pending" | "completed" | "active"; // default: "pending"

export enum ChangeTodoType {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  CLEAR_COMPLETED = "CLEAR_COMPLETED",
  MARK_ALL_AS_COMPLETED = "MARK_ALL_AS_COMPLETED",
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
  todo?: ITodoInput;
}

export interface ITodoContext {
  todos: ITodo[];
  changeTodo?: (args: IChangeTodoArgs) => void;
}
