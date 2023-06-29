import { ChangeTodoType, IChangeTodoArgs, ITodo, ITodoContext } from "./types";
import { createContext, useContext, useState } from "react";

const DEFAULT_VALUE: ITodoContext = {
  todos: [],
};

const TodoContext = createContext<ITodoContext>({ ...DEFAULT_VALUE });

/**
 * A custom hook to use TodoContext
 * @returns {ITodoContext} todos, changeTodo
 */
export const useTodoContext = () => useContext(TodoContext);

export default function TodoContextProvider({ children }: any) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const changeTodo = ({ type, todo }: IChangeTodoArgs) => {
    switch (type) {
      case ChangeTodoType.ADD:
        setTodos([...todos, { ...todo, id: Date.now(), status: "pending" }]);
        break;
      case ChangeTodoType.DELETE:
        setTodos(todos.filter((item) => item.id !== todo.id));
        break;
      case ChangeTodoType.UPDATE:
        setTodos(
          todos.map((item) => {
            return {
              ...item,
              title: item.id === todo.id ? todo.title : item.title,
              status: item.id === todo.id ? todo.status : item.status,
            };
          })
        );
        break;
      case ChangeTodoType.SET_ACTIVE:
        setTodos(
          todos.map((item) => {
            return {
              ...item,
              status: item.id === todo.id ? "active" : item.status,
            };
          })
        );
        break;
      case ChangeTodoType.SET_COMPLETED:
        setTodos(
          todos.map((item) => {
            return {
              ...item,
              status: item.id === todo.id ? "completed" : item.status,
            };
          })
        );
        break;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, changeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
