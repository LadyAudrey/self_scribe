import { useState, useEffect, useRef } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";
import { TasksContext } from "./Contexts/TasksContext";

import { DisplayLists } from "./components/Lists/DisplayLists";
import { Symptoms } from "./components/Symptoms/SymptomsPg";
import { Graphs } from "./components/Graphs/Graphs";

// cannot change the key/value pairs at all bc of Object.freeze
const PAGE_KEYS = Object.freeze({
  DISPLAY_LISTS: "DisplayLists",
  SYMPTOMS: "Symptoms",
  GRAPHS: "Graphs",
  SETTINGS: "Settings",
});

const PAGES = Object.freeze({
  [PAGE_KEYS.DISPLAY_LISTS]: <DisplayLists />,
  [PAGE_KEYS.SYMPTOMS]: <Symptoms />,
  [PAGE_KEYS.GRAPHS]: <Graphs />,
});

export default function Home() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [pageTab, setPageTab] = useState(PAGE_KEYS.DISPLAY_LISTS);
  const dataInitialized = useRef(false);

  useEffect(() => {
    if (!dataInitialized.current) {
      fetchTDL();
      dataInitialized.current = true;
    }
  }, []);

  async function fetchTDL() {
    console.log("entering fetchTDL");
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
      // This isn't working right and I'm not sure why
      if (response.ok) {
        const result = await response.json();
        for (let i = 0; i < result.length; i++) {
          tasks.push(result[i]);
        }
      } else {
        console.error("I'm broke, fetchTasks in App.jsx");
      }
    }
    return tasks;
  }

  return (
    // TODO: background gradient file not working
    <ListsContext.Provider value={{ lists, setLists }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <main className="h-screen w-screen mainBg text-white">
          <header className="flex justify-between">
            <div>
              <button
                className="mainBtns"
                onClick={() => setPageTab(PAGE_KEYS.DISPLAY_LISTS)}
              >
                Lists
              </button>
              {/* this will load the load the lists page */}
              <button
                className="mainBtns"
                onClick={() => setPageTab(PAGE_KEYS.SYMPTOMS)}
              >
                Symptoms
              </button>
              {/* this will load the symptoms page */}
              <button
                className="mainBtns"
                onClick={() => setPageTab(PAGE_KEYS.GRAPHS)}
              >
                Graphs
              </button>
            </div>
            <div>
              <button
                className="mainBtns"
                onClick={() => setPageTab(PAGE_KEYS.SETTINGS)}
              >
                Settings
              </button>
            </div>
          </header>
          <div className="relative flex justify-around">{PAGES[pageTab]}</div>
          <footer className="flex place-content-center w-screen fixed inset-x-0 bottom-0 p-10">
            <h1 className="text-4xl">Self Scribe</h1>
          </footer>
        </main>
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
}
