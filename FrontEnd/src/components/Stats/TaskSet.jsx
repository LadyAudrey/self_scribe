import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";
import { TasksContext } from "../../Contexts/TasksContext";
import { TaskHistoryContext } from "../../Contexts/TaskHistoryContext";

import { TaskItem } from "./TaskItem";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";

export function TaskSet(props) {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  const { taskHistory } = useContext(TaskHistoryContext);
  const { graphingItems, setGraphingItems } = props;
  return (
    <>
      <TaskHistoryContext.Provider value={{ taskHistory }}>
        <div className="title text-2xl">All the Kudos!</div>
        {lists.map((list) => {
          {
            /* how do I get a list of the tasks that have any occurances in task_history that the id with list.id? */
          }
          const filteredTasks = tasks.filter((task) => {
            return;
          });
        })}
      </TaskHistoryContext.Provider>
    </>
  );
}
