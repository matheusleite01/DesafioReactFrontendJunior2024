import { TaskProps } from "../../types";
import TodoItem from "../TodoItem";

type TodoListProps = {
  ItemList: TaskProps[];
};

const TodoList = ({ ItemList }: TodoListProps) => {
  return (
    <>
      {Array.isArray(ItemList) &&
        ItemList.map((item) => (
          <li key={item?.id}>
            <TodoItem task={item} />
          </li>
        ))}
    </>
  );
};

export default TodoList;
