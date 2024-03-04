import { useEffect, useState } from "react";

export function Tasks(listId) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);
  const user = "audrey";
  async function fetchTasks() {
    const response = await fetch(
      `http://localhost:3001/tasks/read/${user}/${listId}/`
    );
    const result = await response.json();
    setTasks(result.tasks);
    console.log(tasks);
  }
  return (
    <>
      <h2>I'm a task!</h2>
    </>
  );
}
