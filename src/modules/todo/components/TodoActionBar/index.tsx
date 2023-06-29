import { Button } from "react-bootstrap";
import styles from "./TodoActionBar.module.scss";
import { useTodoContext } from "../../../../contexts/TodoContext";
import { useMemo } from "react";
import { TODO_FILTER_TYPES, TodoFilterType } from "../../types";
import { ChangeTodoType } from "../../../../contexts/TodoContext/types";

function FilterBtn({
  type,
  handleFilterBtnClick,
  isActive,
}: {
  type: TodoFilterType;
  handleFilterBtnClick: (filterType: TodoFilterType) => void;
  isActive: boolean;
}) {
  return (
    <Button
      size="sm"
      variant="light"
      className={`${styles.filterBtn} ${isActive ? styles.active : ""}`}
      onClick={() => handleFilterBtnClick(type)}
    >
      {type}
    </Button>
  );
}

export default function TodoActionBar({
  filterType,
  onSetFilterType,
}: {
  filterType: TodoFilterType;
  onSetFilterType: (filterType: TodoFilterType) => void;
}) {
  const { todos, changeTodo } = useTodoContext();

  const itemsLeft = useMemo(() => {
    return todos.filter((todo) => todo.status === "pending").length;
  }, [todos]);

  const handleFilterBtnClick = (filterType: TodoFilterType) => {
    onSetFilterType(filterType);
  };

  const onClickClearCompleted = () => {
    if (!changeTodo) return;

    changeTodo({
      type: ChangeTodoType.CLEAR_COMPLETED,
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.status}>
        {itemsLeft && filterType === "ALL" ? `${itemsLeft} items left` : ""}
      </div>
      <div>
        {TODO_FILTER_TYPES.map((type) => (
          <FilterBtn
            type={type}
            handleFilterBtnClick={handleFilterBtnClick}
            key={type}
            isActive={type === filterType}
          />
        ))}
      </div>
      <div>
        <Button
          size="sm"
          variant="light"
          onClick={onClickClearCompleted}
          className={styles.filterBtn}
        >
          Clear completed
        </Button>
      </div>
    </div>
  );
}
