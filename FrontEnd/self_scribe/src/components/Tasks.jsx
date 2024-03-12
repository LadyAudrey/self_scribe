import { useEffect, useState } from "react";

import { EditTask } from "./EditTask";

export function Tasks(props) {
  const { listID, tasks, setTasks } = props;

  const [taskCompleted, setTaskCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
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
                {editingTask && <EditTask />}
                {!editingTask && (
                  <button
                    className="h-6 w-6  bg-cover editBtn bg-[url('/Buttons/Edit.svg')]"
                    onClick={setEditingTask(!editingTask)}
                  ></button>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}
