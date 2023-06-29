import Card from "../../../common/components/Card";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import styles from "./TodoPage.module.scss";

export default function TodoPage() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>todos</h1>
        <Card isFullWidth>
          <TodoInput />
          <TodoList />
        </Card>
      </div>
    </div>
  );
}
