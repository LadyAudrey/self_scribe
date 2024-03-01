import { useContext } from "react";
import { useState } from "react";
import { ListsContext } from "../Contexts/ListsContext";

export function AddTask(props) {
  const { listID, tasks, setTasks } = props;

  const { lists, setLists } = useContext(ListsContext);
  const [taskName, setTaskName] = useState("");

  function handleAddTaskChange(event) {
    setTaskName(event.target.value);
  }

  async function handleAddTaskSubmit(event) {
    event.preventDefault();
    console.log(taskName);
    const user = "audrey";
    const response = await fetch(
      `http://localhost:3001/tasks/add/${user}/${taskName}`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      // TODO: create state consuming the Context
      setTasks([...tasks, result.rows[0]]);
    }
  }
  return (
    <form onSubmit={handleAddTaskSubmit} className="self-end">
      <button type="submit">Add Task</button>
      <label>
        <input
          type="text"
          name="newTask"
          value={taskName}
          onChange={handleAddTaskChange}
          className="bg-black rounded-md mx-2 border-slate-800 border-2"
        ></input>
      </label>
    </form>
  );
}
