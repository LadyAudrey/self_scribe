import { useEffect, useState } from "react";

import { DisplayLists } from "./components/DisplayLists";

export default function Home() {
  const [toDoList, setToDoList] = useState(null);
  const [completed, setCompleted] = useState(null);

  // async function fetchCompleted() {
  //   const response = await fetch("http://localhost:3001/completed");
  //   const result = await response.json();
  //   setCompleted(result);
  // }

  return (
    <main>
      <h1>Self Watch</h1>
      <div className="flex">
        <div>
          <h2>Today's items left to do</h2>
          <DisplayLists />
        </div>
        <div>
          <h2>What you've done today</h2>
          <DisplayLists />
        </div>
      </div>
    </main>
  );
}
