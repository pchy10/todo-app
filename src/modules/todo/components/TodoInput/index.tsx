import { useEffect, useState } from "react";
import styles from "./TodoInput.module.scss";
import { useTodoContext } from "../../../../contexts/TodoContext";
import { ChangeTodoType } from "../../../../contexts/TodoContext/types";
import IconDownArrow from "../../../../assets/IconDownArrow";
import IconClose from "../../../../assets/IconClose";
import Dropdown from "react-bootstrap/Dropdown";

export default function TodoInput({
  selectedTodoId,
  setSelectedTodoId,
}: {
  selectedTodoId: number | null;
  setSelectedTodoId: (id: number | null) => void;
}) {
  const [input, setInput] = useState<string>("");
  const { todos, changeTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !changeTodo) return;

    changeTodo({
      type: selectedTodoId ? ChangeTodoType.UPDATE : ChangeTodoType.ADD,
      todo: {
        title: input,
        id: selectedTodoId ?? undefined,
      },
    });

    setSelectedTodoId(null);
    setInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    setInput("");
    setSelectedTodoId(null);
  };

  const handleAllCompleted = () => {
    if (!changeTodo) return;

    changeTodo({
      type: ChangeTodoType.MARK_ALL_AS_COMPLETED,
    });
  };

  useEffect(() => {
    if (!selectedTodoId) return;

    const todo = todos.find((todo) => todo.id === selectedTodoId);
    if (!todo) return;

    setInput(todo.title);
  }, [selectedTodoId, todos]);

  return (
    <div className={styles.root}>
      <Dropdown>
        <Dropdown.Toggle variant="light" className={styles.dropdownBtn}>
          <IconDownArrow className={styles.icon} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleAllCompleted}>
            Mark all as completed
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          type="text"
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
        <IconClose
          className={`${styles.closeBtn} ${input ? styles.active : ""}`}
          onClick={handleClear}
        />
      </form>
    </div>
  );
}
