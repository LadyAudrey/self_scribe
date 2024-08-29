import { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "./Task";

import { TasksContext } from "../../Contexts/TasksContext";

export function Tasks(props) {
  const { listId } = props;
  const { tasks } = useContext(TasksContext);

  return (
    <div className="">
      {tasks.length > 0 &&
        tasks
          .filter((task) => {
            return task.list_id === listId && task.completed == 0;
          })
          .map((task) => {
            return <Task key={uuidv4()} taskId={task.id} />;
          })}
    </div>
  );
}
