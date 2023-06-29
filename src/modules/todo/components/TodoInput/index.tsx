import styles from "./TodoInput.module.scss";

export default function TodoInput() {
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
      />
    </div>
  );
}
