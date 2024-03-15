import { useState, useContext } from "react";
import { EditTask } from "./EditTask";

import { TasksContext } from "../Contexts/TasksContext.js";

export function Task({ taskId }) {
  const [editingTask, setEditingTask] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const { tasks, setTasks } = useContext(TasksContext);
  const task = tasks.find((task) => {
    return task.id === taskId;
  });
  console.log(task);
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
          onClick={() => {
            setEditingTask(!editingTask);
          }}
        ></button>
      )}
    </div>
  );
}
