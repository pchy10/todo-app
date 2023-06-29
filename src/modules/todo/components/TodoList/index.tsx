import ListGroup from "react-bootstrap/ListGroup";
import styles from "./TodoList.module.scss";
import Form from "react-bootstrap/Form";
import { useTodoContext } from "../../../../contexts/TodoContext";
import { ITodo } from "../../../../contexts/TodoContext/types";

interface TodoListItemArgs extends ITodo {}

function TodoListItem({ id, title, status }: TodoListItemArgs) {
  return (
    <ListGroup.Item className={styles.item} as="li">
      <Form.Check type="radio" label={title} />
    </ListGroup.Item>
  );
}

export default function TodoList() {
  const { todos } = useTodoContext();

  return (
    <ListGroup className={styles.root} as="ul">
      {todos.map((todo) => (
        <TodoListItem {...todo} key={todo.id} />
      ))}
    </ListGroup>
  );
}
