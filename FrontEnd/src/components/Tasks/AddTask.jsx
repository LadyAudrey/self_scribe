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
    if (response.ok) {
      const result = await response.json();
      setTasks([...tasks, result.rows[0]]);
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
