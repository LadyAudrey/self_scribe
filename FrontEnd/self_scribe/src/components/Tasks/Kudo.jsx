import { useContext, useState } from "react";

import { EditTask } from "./EditTask";
import { TasksContext } from "../../Contexts/TasksContext";

export function Kudo(props) {
  const { taskId } = props;
  const { tasks, setTasks } = useContext(TasksContext);
  const [editingTask, setEditingTask] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);
  const task = tasks.filter((element) => {
    return element.id === taskId;
  })[0];

  async function handleTaskReverse() {
    setUpdatePending(true);
    try {
      const response = await fetch(
        "http://localhost:3001/tasks/update-completed",
        {
          method: "POST",
          body: JSON.stringify({
            taskHistoryId: task.taskHistory[0].id,
            completed: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("failed to set completed value in Kudo.jsx");
      }
      setUpdatePending(false);
      const taskIndex = tasks.indexOf(task);
      const newTasks = [...tasks];
      newTasks[taskIndex].completed = false;
      setTasks(newTasks);
    } catch (error) {
      console.error(error);
      setUpdatePending(false);
    }
  }

  return (
    <>
      <div className="flex">
        <h3>{task.name}</h3>
        {/* <label htmlFor={task.name} className="legend-title">
              {task.name}
            </label> */}
        <input
          type="checkbox"
          disabled={updatePending}
          onChange={handleTaskReverse}
          className="m-2"
          checked={true}
        />
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
