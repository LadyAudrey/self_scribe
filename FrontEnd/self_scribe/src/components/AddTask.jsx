import { useContext, useState } from "react";
import { TasksContext } from "../Contexts/TasksContext";

export function AddTask(props) {
  const { listId } = props;
  const [taskName, setTaskName] = useState("Add Task");
  const { tasks, setTasks } = useContext(TasksContext);

  function handleAddTaskChange(event) {
    setTaskName(event.target.value);
  }

  async function handleAddTaskSubmit(event) {
    event.preventDefault();
    const user = "audrey";
    const response = await fetch(
      `http://localhost:3001/tasks/add/${user}/${listId}/${taskName}`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const result = await response.json();
      // TODO: create state consuming the Context
      setTasks([...tasks, result.rows[0]]);
    }
  }
  return (
    <form onSubmit={handleAddTaskSubmit} className="self-end text-white">
      {/* <button type="submit">Add Task</button> */}
      <label>
        <input
          type="text"
          name="newTask"
          value={taskName}
          // defaultValue={"Add Task"}
          onChange={handleAddTaskChange}
          // tried to use max-w-fit, unsuccessful, want it to fit close to the words
          className=" bg-black rounded-md border-emerald-500 p-2 border-2"
        ></input>
      </label>
    </form>
  );
}
