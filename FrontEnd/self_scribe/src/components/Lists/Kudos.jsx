import { useContext, useEffect } from "react";
import { TasksContext } from "../../Contexts/TasksContext";

export function Kudos() {
  const { tasks } = useContext(TasksContext);
  return (
    <>
      <fieldset>
        <legend className="legend title">Kudos!</legend>
        {tasks
          .filter((task) => {
            return task.completed;
          })
          .map((task, index) => (
            <div key={index}>
              <h3>{task.name}</h3>
              {/* <label htmlFor={task.name} className="legend-title">
              {task.name}
            </label> */}
              <button>Edit</button>
            </div>
          ))}
      </fieldset>
    </>
  );
}
