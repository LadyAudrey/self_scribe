import { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { TasksContext } from "../../Contexts/TasksContext";
import { Kudo } from "../Tasks/Kudo";

export function Kudos() {
  const { tasks } = useContext(TasksContext);
  return (
    <>
      <fieldset className="side">
        <legend className="legend title">Kudos!</legend>
        {tasks
          .filter((task) => {
            return task.completed;
          })
          .map((task) => (
            <Kudo taskId={task.id} key={uuidv4()} />
          ))}
      </fieldset>
    </>
  );
}
