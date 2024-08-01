import { v4 as uuidv4 } from "uuid";

import { TaskItem } from "./TaskItem";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";

export function TaskSet(props) {
  const { tasks } = props;
  return (
    <>
      {tasks.map((taskItem) => {
        return <TaskItem key={uuidv4()} itemID={taskItem.id} />;
      })}
    </>
  );
}
