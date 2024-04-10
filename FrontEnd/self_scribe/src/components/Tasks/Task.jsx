import { useState, useContext } from "react";
import { EditTask } from "./EditTask.jsx";

import { TasksContext } from "../../Contexts/TasksContext.js";

export function Task({ taskId }) {
  const [editingTask, setEditingTask] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const { tasks, setTasks } = useContext(TasksContext);
  const task = tasks.find((task) => {
    return task.id === taskId;
  });
  return (
    <div className="flex px-8 gap-3">
      <div className="flex h-fit">
        <h4>{task.name}</h4>
        <input
          type="checkbox"
          onChange={() => {
            setTaskCompleted(!taskCompleted);
          }}
          className="m-2"
          checked={taskCompleted}
        />
      </div>
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
      )}
    </div>
  );
}
