import { useState } from "react";
import styles from "./TodoInput.module.scss";
import { useTodoContext } from "../../../../contexts/TodoContext";
import { ChangeTodoType } from "../../../../contexts/TodoContext/types";

export default function TodoInput() {
  const [input, setInput] = useState<string>("");
  const { changeTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !changeTodo) return;

    changeTodo({
      type: ChangeTodoType.ADD,
      todo: {
        title: input,
      },
    });
    setInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          type="text"
          placeholder="What needs to be done?"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
