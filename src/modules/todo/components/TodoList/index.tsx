import ListGroup from "react-bootstrap/ListGroup";
import styles from "./TodoList.module.scss";
import { useTodoContext } from "../../../../contexts/TodoContext";
import TodoListItem from "../TodoListItem";
import { TodoFilterType } from "../../types";
import { useMemo } from "react";

export default function TodoList({
  filterType,
  onSelectedTodoId,
}: {
  filterType: TodoFilterType;
  onSelectedTodoId: (id: number) => void;
}) {
  const { todos } = useTodoContext();

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case "ALL":
        return todos;
      case "ACTIVE":
        return todos.filter((todo) => todo.status === "pending");
      case "COMPLETED":
        return todos.filter((todo) => todo.status === "completed");
      default:
        return todos;
    }
  }, [todos, filterType]);

  return (
    <ListGroup className={styles.root} as="ul">
      {filteredTodos.map((todo) => (
        <TodoListItem {...todo} onSelectTodo={onSelectedTodoId} key={todo.id} />
      ))}
    </ListGroup>
  );
}
