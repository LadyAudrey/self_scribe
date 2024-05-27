import { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";
import { TasksContext } from "../../Contexts/TasksContext";
import { Kudo } from "../Tasks/Kudo";

// TODO: get the list of tasks (DONE)
// create an array of lists that have some tasks completed in them (DONE)
// update UI to contain list name, collapsing, edit and done/undone buttons
// figure out how to render Kudos under the appropriate lists, with done/undone and edit btns

export function Kudos() {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  // copy code from List.jsx filter()
  // iterate through kudosCompletedLists and create UI for each kudo
  return (
    <>
      <fieldset className="side">
        <legend className="legend title text-2xl">Kudos!</legend>
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
