import { useEffect, useState, useContext } from "react";

import { Task } from "./Task";

import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "../Contexts/TasksContext";

export function Tasks(props) {
  const { listId } = props;
  const { tasks } = useContext(TasksContext);
  console.log(listId, tasks);
  return (
    <>
      <div className="">
        {tasks &&
          tasks
            .filter((task) => {
              console.log(task);
              return task.list_id === listId;
            })
            .map((task) => {
              return <Task key={uuidv4()} taskId={task.id} />;
            })}
      </div>
    </>
  );
}
