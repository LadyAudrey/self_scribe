import { useEffect, useState } from "react";
import { AddTask } from "./AddTask";

export function Tasks({ listId }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  async function fetchTasks() {
    const response = await fetch(`http://localhost:3001/tasks/read/${listId}/`);
    if (response.ok) {
      const result = await response.json();
      setTasks(result);
      console.log(result);
    } else {
      console.log("I'm broke, kthxy bai");
    }
  }
  return (
    <>
      <AddTask listId={listId} tasks={tasks} setTasks={setTasks} />
      {tasks &&
        tasks.map((task) => {
          return <h4>{task.name}</h4>;
        })}
    </>
  );
}
