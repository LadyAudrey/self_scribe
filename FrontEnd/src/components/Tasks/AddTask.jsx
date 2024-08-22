import { useContext, useState } from "react";
import { TasksContext } from "../../Contexts/TasksContext";

export function AddTask(props) {
  const { listId } = props;
  const [taskName, setTaskName] = useState("");
  const { tasks, setTasks } = useContext(TasksContext);

  function handleAddTaskChange(event) {
    setTaskName(event.target.value);
  }

  async function handleAddTaskSubmit(event) {
    event.preventDefault();
    const response = await fetch(`/tasks/add/${listId}/${taskName}`, {
      method: "POST",
    });
    // got to here; current bug is addTask is not currently working August 22, 2024
    if (response.ok) {
      const id = await response.json();
      const newTask = {
        id,
        list_id: listId,
        last_updated: Date.now().toString(),
        name: taskName,
        user_name: "audrey",
        created_on: Date.now().toString(),
        repeats: false,
        frequency: "",
      };
      setTasks([...tasks, newTask]);
    }
  }
  return (
    <form onSubmit={handleAddTaskSubmit} className="self-end text-white">
      <label>
        <input
          type="text"
          name="newTask"
          placeholder="Add Task"
          value={taskName}
          onChange={handleAddTaskChange}
          // tried to use max-w-fit, unsuccessful, want it to fit close to the words
          className=" bg-black w-fit rounded-md border-emerald-500 p-2 border-2"
        />
      </label>
    </form>
  );
}
