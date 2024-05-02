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
        {/* why is task a string and not an object? */}
        {tasks
          .filter((task) => {
            console.log(typeof task);
            return task.completed;
          })
          .map((task, index) => (
            <Kudo task={task} index={index} key={uuidv4()} />
          ))}
      </fieldset>
    </>
  );
}
