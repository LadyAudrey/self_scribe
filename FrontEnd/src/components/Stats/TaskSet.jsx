import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";
import { TasksContext } from "../../Contexts/TasksContext";
import { TaskHistoryContext } from "../../Contexts/TaskHistoryContext";

import { TaskItem } from "./TaskItem";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { GraphItemsContext } from "../../Contexts/GraphingItemsContext";

const mockTaskHistory = [
  {
    id: 4444,
    task_id: 43,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4444,
    task_id: 43,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4444,
    task_id: 45,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4445,
    task_id: 45,
    created_on: "2024-04-19 09:04:59.282867",
    completed: false,
    notes: "more details",
  },
  {
    id: 4446,
    task_id: 45,
    created_on: "2024-04-19 09:04:59.282867",
    completed: false,
    notes: "some more details",
  },
];

export function TaskSet() {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  const { taskHistory } = useState(mockTaskHistory);
  const { graphingItems, setGraphingItems } = useContext(GraphItemsContext);
  console.log(taskHistory);
  async function fetchTaskHistory() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="title text-2xl">All the Kudos!</div>
      {lists.map((list) => {
        {
          /* how do I get a list of the tasks that have any occurances in task_history that the id with list.id? */
        }
        const filteredTasks = tasks.filter((task) => {
          return;
        });
      })}
    </>
  );
}
