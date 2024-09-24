import { useContext } from "react";

import { TaskHistoryContext } from "../../../Contexts/TaskHistoryContext";
import { GraphItemsContext } from "../../../Contexts/GraphingItemsContext";

export function TaskInstance(props) {
  // {taskId} = props.taskId;
  const { graphItems, setGraphItems } = useContext(GraphItemsContext);
  const { taskHistory, setTaskHistory } = useContext(TaskHistoryContext);
  return (
    <>
      <h3>{props.taskName}</h3>
      {props.instances.map((instance) => {
        return (
          <div className="px-5">
            <p>{instance.created_on}</p>
            <p>{instance.notes}</p>
            {/* edit fx */}
            {/* delete fx */}
          </div>
        );
      })}
    </>
  );
}
