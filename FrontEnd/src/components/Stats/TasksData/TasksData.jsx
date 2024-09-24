import { useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { TasksContext } from "../../../Contexts/TasksContext";
import { TaskHistoryContext } from "../../../Contexts/TaskHistoryContext";
import { GraphItemsContext } from "../../../Contexts/GraphingItemsContext";

export function TasksData(props) {
  const { tasks } = useContext(TasksContext);
  const { taskHistory } = useContext(TaskHistoryContext);
  const { graphItems, setGraphItems } = useContext(GraphItemsContext);
  const { list } = props;

  const theseTasks = tasks.filter((task) => {
    return task.list_id == list.id;
  });

  function handleChecked(event, task) {
    const checked = Boolean(event.target.checked);
    if (checked) {
      console.log("event is true", checked);
      const tasks = taskHistory.filter((taskInstance) => {
        return task.id === taskInstance.task_id;
      });
      setGraphItems([...graphItems, ...tasks]);
    } else {
      console.log("event is false");
      const tasks = graphItems.filter((taskInstance) => {
        return task.id !== taskInstance.task_id;
      });
      setGraphItems(tasks);
    }
  }

  return (
    <div>
      {theseTasks.map((task) => {
        return (
          <div className="flex px-3 gap-3" key={uuidv4()}>
            <input
              type="checkbox"
              onChange={(event) => {
                handleChecked(event, task);
              }}
            ></input>
            <h4>{task.name}</h4>
            {/* <TaskInstance taskId={task.id} /> */}
          </div>
        );
      })}
    </div>
  );
}
