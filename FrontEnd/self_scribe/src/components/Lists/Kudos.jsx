import { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";
import { TasksContext } from "../../Contexts/TasksContext";
import { Kudo } from "../Tasks/Kudo";

// TODO: get the list of tasks (DONE)
// create an array of lists that have some tasks completed in them (DONE)
function getCompletedKudos(lists, tasks) {
  // Question: why is it rendering so many times?
  // create an array holding a dict{the lists, and an array of the tasks}
  // create an set of lists that have some tasks completed in them
  const kudosInfoDict = { kudosLists: [], listToTasksDict: {} };
  // loop through tasks
  for (let task = 0; task < tasks.length; task++) {
    // if task is completed, add the list with that id to kudosListsSet
    if (tasks[task].completed) {
      for (let list = 0; list < lists.length; list++) {
        if (lists[list].id === tasks[task].list_id) {
          kudosInfoDict.kudosLists.push(lists[list]);
          if (lists[list].id in kudosInfoDict.listToTasksDict) {
            kudosInfoDict.listToTasksDict.lists[list].id.push(task);
          } else {
            kudosInfoDict.listToTasksDict[lists[list]] = [tasks[task]];
          }
        }
      }
    }
  }
  return kudosInfoDict;
}
// update UI to contain list name, collapsing, edit and done/undone buttons
// figure out how to render Kudos under the appropriate lists, with done/undone and edit btns

export function Kudos() {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  // // helper function to find the lists that have completed tasks
  getCompletedKudos(lists, tasks);
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
