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
  const { taskHistory, setTaskHistory } = useContext(TaskHistoryContext);

  console.log("lists", lists);
  console.log("tasks", tasks);
  console.log("history", taskHistory);

  return (
    <>
      <TaskHistoryContext.Provider value={{ taskHistory, setTaskHistory }}>
        <h3>hello</h3>
      </TaskHistoryContext.Provider>
    </>
  );
}
