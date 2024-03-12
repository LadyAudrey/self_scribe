import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";

export function Tasks(props) {
  const { listID, tasks, setTasks } = props;

  const [taskCompleted, setTaskCompleted] = useState(false);
  return (
    <>
      <div className="">
        {tasks &&
          tasks.map((task) => {
            return (
              <div className="flex px-8 gap-3">
                <h4>{task.name}</h4>
                <input
                  type="checkbox"
                  onChange={() => {
                    setTaskCompleted(!taskCompleted);
                  }}
                  className="m-2"
                  checked={taskCompleted}
                />
                <button className="h-6 w-6 bg-cover bg-[url('/Buttons/Edit.svg')]"></button>
                <h3 className="legend title"></h3>
              </div>
            );
          })}
      </div>
    </>
  );
}
