import { useState, useContext } from "react";
import { EditTask } from "./EditTask.jsx";

import { TasksContext } from "../../Contexts/TasksContext.js";

export function Task({ taskId }) {
  const [editingTask, setEditingTask] = useState(false);
  const { tasks, setTasks } = useContext(TasksContext);
  const task = tasks.find((task) => {
    return task.id === taskId;
  });
  const completed =
    task.taskHistory.length > 0 && task.taskHistory[0].completed;
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [updatePending, setUpdatePending] = useState(false);
  async function handleTaskComplete() {
    setUpdatePending(true);
    try {
      const completed = !taskCompleted;
      const response = await fetch(
        "http://localhost:3001/tasks/update-completed",
        {
          method: "POST",
          body: JSON.stringify({
            taskHistoryId: task.taskHistory[0].id,
            completed,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("failed to set completed value");
      }
      setTaskCompleted(completed);
      setUpdatePending(false);
    } catch (error) {
      console.log(error);
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
