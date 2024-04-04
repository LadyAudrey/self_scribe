import { useState, useEffect } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";
import { TasksContext } from "./Contexts/TasksContext";

import { DisplayLists } from "./components/Lists/DisplayLists";
import { Symptoms } from "./components/Symptoms/Symptoms";
import { Graphs } from "./components/Graphs/Graphs";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [pageTab, setPageTab] = useState("DisplayLists");

  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/lists/read/audrey");
    const result = await response.json();
    setLists(result);
    const tasks = await fetchTasks(result);
    setTasks(tasks);
  }

  async function fetchTasks(lists) {
    const tasks = [];

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const response = await fetch(
        `http://localhost:3001/tasks/read/${list.id}/`
      );
      if (response.ok) {
        const result = await response.json();
        tasks.push(...result);
      } else {
        console.log("I'm broke, line 35 in App.jsx");
      }
    }
    return tasks;
  }

  // create frequency function TODO

  return (
    // TODO: background gradient file not working
    <ListsContext.Provider value={{ lists, setLists }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <main className="h-screen w-screen mainBg text-white">
          <header className="flex justify-between">
            <div>
              <button
                className="mainBtns"
                onClick={() => setPageTab("DisplayLists")}
              >
                Lists
              </button>
              {/* this will load the load the lists page */}
              <button
                className="mainBtns"
                onClick={() => setPageTab("Symptoms")}
              >
                Symptoms
              </button>
              {/* this will load the symptoms page */}
              <button className="mainBtns" onClick={() => setPageTab("Graphs")}>
                Graphs
              </button>
              {/* this will load the graphing page */}
            </div>
            <div>
              <button className="mainBtns">Settings</button>
              {/* this will load the Settings for the app */}
            </div>
          </header>
          <div className="relative flex justify-around">
            <DisplayLists />
          </div>
          <footer className="flex place-content-center w-screen fixed inset-x-0 bottom-0 p-10">
            <h1 className="text-4xl">Self Scribe</h1>
          </footer>
        </main>
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
}
