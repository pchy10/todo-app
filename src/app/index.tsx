import TodoPage from "../modules/todo/components/TodoPage";
import styles from "./App.module.scss";

export default function App() {
  return (
    <main className={styles.root}>
      <TodoPage />
    </main>
  );
}
