import Form from "react-bootstrap/Form";
import { ChangeTodoType, ITodo } from "../../../../contexts/TodoContext/types";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./TodoListItem.module.scss";
import IconPencil from "../../../../assets/IconPencil";
import IconClose from "../../../../assets/IconClose";
import { useTodoContext } from "../../../../contexts/TodoContext";

interface TodoListItemArgs extends ITodo {
  onSelectTodo: (id: number) => void;
}

export default function TodoListItem({
  id,
  title,
  status,
  onSelectTodo,
}: TodoListItemArgs) {
  const { changeTodo } = useTodoContext();
  const onClickEdit = () => {
    onSelectTodo(id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    if (!changeTodo) return;

    changeTodo({
      type: ChangeTodoType.UPDATE,
      todo: {
        id,
        title,
        status: status === "completed" ? "pending" : "completed",
      },
    });
  };

  return (
    <ListGroup.Item className={styles.root} as="li">
      <Form.Check type="radio">
        <Form.Check.Input
          type="radio"
          checked={status === "completed"}
          onChange={handleChange}
        />
        <Form.Check.Label
          className={status === "completed" ? styles.completedTask : ""}
          onClick={handleChange}
        >
          {title}
        </Form.Check.Label>
      </Form.Check>
      <div>
        <IconPencil className={styles.btn} onClick={onClickEdit} />
        <IconClose className={styles.btn} />
      </div>
    </ListGroup.Item>
  );
}
