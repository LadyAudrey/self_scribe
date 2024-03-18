import { useEffect, useState, useContext } from "react";

import { Task } from "./Task";

import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "../Contexts/TasksContext";

export function Tasks(props) {
  const { listId } = props;
  const { tasks } = useContext(TasksContext);

  const filteredTasks = tasks.filter((task) => {
    return task.list_id === listId;
  });

  return (
    <>
      <div className="">
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => {
            return <Task key={uuidv4()} taskId={task.id} />;
          })}
      </div>
    </>
  );
}
