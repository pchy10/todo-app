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
        if (todo) {
          setTodos([...todos, { ...todo, id: Date.now(), status: "pending" }]);
        }
        break;
      case ChangeTodoType.DELETE:
        if (todo) {
          setTodos(todos.filter((item) => item.id !== todo.id));
        }
        break;
      case ChangeTodoType.UPDATE:
        if (todo) {
          setTodos(
            todos.map((item) => {
              return {
                ...item,
                title: item.id === todo.id ? todo.title : item.title,
                status:
                  item.id === todo.id && todo.status
                    ? todo.status
                    : item.status,
              };
            })
          );
        }
        break;
      case ChangeTodoType.CLEAR_COMPLETED:
        setTodos(todos.filter((item) => item.status !== "completed"));
        break;

      case ChangeTodoType.MARK_ALL_AS_COMPLETED:
        setTodos(
          todos.map((item) => {
            return {
              ...item,
              status: "completed",
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
