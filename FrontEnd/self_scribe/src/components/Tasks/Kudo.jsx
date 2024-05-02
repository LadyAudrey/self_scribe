import { useState } from "react";

import { EditTask } from "./EditTask";

export function Kudo(props) {
  const { task, index } = props;
  const [editingTask, setEditingTask] = useState(false);
  console.log(task);
  return (
    <>
      <div key={index} className="flex">
        <h3>{task.name}</h3>
        {/* <label htmlFor={task.name} className="legend-title">
              {task.name}
            </label> */}
        {editingTask && (
          <EditTask
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            task={task}
          />
        )}
        {!editingTask && (
          <button
            className="h-6 w-6  bg-cover pencil bg-[url('/Buttons/Edit.svg')]"
            onClick={() => {
              setEditingTask(!editingTask);
            }}
          ></button>
        )}{" "}
      </div>
    </>
  );
}
