import { useEffect, useState } from "react";

import { DisplayLists } from "./components/DisplayLists";

export default function Home() {
  const [toDoList, setToDoList] = useState(null);
  const [completed, setCompleted] = useState(null);

  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/TDL");
    const result = await response.json();
    setToDoList(result);
  }

  // async function fetchCompleted() {
  //   const response = await fetch("http://localhost:3001/completed");
  //   const result = await response.json();
  //   setCompleted(result);
  // }

  return (
    <main>
      <h1>Hi, I'm Home</h1>
      {toDoList && <DisplayLists list={toDoList} />}
      {/* {completed && <DisplayLists list={completed} />} */}
      {/* instead of useEffect, could fetch data with an event => */}
      {/* <button onClick={fetchTDL}>fetch data</button> */}
    </main>
  );
}
