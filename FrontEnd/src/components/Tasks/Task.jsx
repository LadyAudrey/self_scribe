import { useState, useContext } from "react";

import { TasksContext } from "../../Contexts/TasksContext.js";

import { EditBtn } from "../UI_Pieces/EditBtn.jsx";
import { EditTask } from "./EditTask.jsx";

export function Task({ taskId }) {
  const [editingTask, setEditingTask] = useState(false);
  const { tasks, setTasks } = useContext(TasksContext);
  const task = tasks.find((task) => {
    return task.id === taskId;
  });
  const [updatePending, setUpdatePending] = useState(false);
  async function handleTaskComplete() {
    setUpdatePending(true);
    try {
      const response = await fetch("/tasks/update-completed", {
        method: "POST",
        body: JSON.stringify({
          taskHistoryId: task.taskHistory[0].id,
          completed: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("failed to set completed value");
      }
      setUpdatePending(false);
      const taskIndex = tasks.indexOf(task);
      const newTasks = [...tasks];
      newTasks[taskIndex].completed = true;
      setTasks(newTasks);
    } catch (error) {
      console.error(error);
      setUpdatePending(false);
    }
  }

  return (
    <div className="flex px-8 gap-3">
      <div className="flex h-fit">
        <h4>{task.name}</h4>
        <input
          type="checkbox"
          disabled={updatePending}
          onChange={handleTaskComplete}
          className="m-2"
          checked={false}
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
        <EditBtn setEditing={setEditingTask} editing={editingTask} />
      )}
    </div>
  );
}
