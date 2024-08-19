import { useState, useEffect, useRef } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";
import { TasksContext } from "./Contexts/TasksContext";
import { TaskHistoryContext } from "./Contexts/TaskHistoryContext";
import { SymptomsContext } from "./Contexts/SymptomsContext";

import { DisplayLists } from "./components/Lists/DisplayLists";
import { SymptomsPg } from "./components/Symptoms/SymptomsPg";
import { Stats } from "./components/Stats/Stats";
import { Settings } from "./components/Settings/Settings";

// cannot change the key/value pairs at all bc of Object.freeze
const PAGE_KEYS = Object.freeze({
  DISPLAY_LISTS: "DisplayLists",
  SYMPTOMS: "Symptoms",
  STATS: "Stats",
  SETTINGS: "Settings",
});

const PAGES = Object.freeze({
  [PAGE_KEYS.DISPLAY_LISTS]: <DisplayLists />,
  [PAGE_KEYS.SYMPTOMS]: <SymptomsPg />,
  [PAGE_KEYS.STATS]: <Stats />,
  [PAGE_KEYS.SETTINGS]: <Settings />,
});

export const CATEGORIES = Object.freeze([
  "Digestion",
  "Pain",
  "Sleep",
  "Cognition",
]);

export default function Home() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [pageTab, setPageTab] = useState(PAGE_KEYS.DISPLAY_LISTS);
  const dataInitialized = useRef(false);

  useEffect(() => {
    if (!dataInitialized.current) {
      fetchTDL();
      fetchSymptoms();
      dataInitialized.current = true;
    }
  }, []);

  async function fetchTDL() {
    try {
      const response = await fetch("/lists/read/audrey");
      const result = await response.json();
      setLists(result);
      const tasks = await fetchTasks(result);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchSymptoms() {
    try {
      const response = await fetch("/symptoms/bank/1");
      if (response.ok) {
        const result = await response.json();
        setSymptoms(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTasks(lists) {
    const tasks = [];

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const response = await fetch(`/tasks/read/${list.id}/`);
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
        <TaskHistoryContext.Provider value={{ taskHistory, setTaskHistory }}>
          <SymptomsContext.Provider value={{ symptoms, setSymptoms }}>
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
                    onClick={() => setPageTab(PAGE_KEYS.STATS)}
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
              <div className="relative flex justify-around">
                {PAGES[pageTab]}
              </div>
              <footer className="flex place-content-center w-screen fixed inset-x-0 bottom-0 p-10">
                <h1 className="text-4xl">Self Scribe</h1>
              </footer>
            </main>
          </SymptomsContext.Provider>
        </TaskHistoryContext.Provider>
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
}
