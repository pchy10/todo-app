import { useState } from "react";
import Card from "../../../common/components/Card";
import { TodoFilterType } from "../../types";
import TodoActionBar from "../TodoActionBar";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import styles from "./TodoPage.module.scss";

export default function TodoPage() {
  const [filterType, setFilterType] = useState<TodoFilterType>("ALL");
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>todos</h1>
        <Card isFullWidth>
          <TodoInput
            selectedTodoId={selectedTodoId}
            setSelectedTodoId={setSelectedTodoId}
          />
          <TodoList
            onSelectedTodoId={setSelectedTodoId}
            filterType={filterType}
          />
          <TodoActionBar
            filterType={filterType}
            onSetFilterType={setFilterType}
          />
        </Card>
      </div>
    </div>
  );
}
