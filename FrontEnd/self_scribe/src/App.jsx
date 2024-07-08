import { useState, useEffect, useRef } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";
import { TasksContext } from "./Contexts/TasksContext";

import { DisplayLists } from "./components/Lists/DisplayLists";
import { Symptoms } from "./components/Symptoms/SymptomsPg";
import { Graphs } from "./components/Graphs/Graphs";
import { Settings } from "./components/Settings/Settings";
import { SymptomsContext } from "./Contexts/Symptoms";

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
  [PAGE_KEYS.SETTINGS]: <Settings />,
});

export const CATEGORIES = Object.freeze([
  "Digestion",
  "Pain",
  "Sleep",
  "Cognition",
]);

const dummySymptoms = [
  {
    id: 0,
    name: "intenstine discomfort",
    created_on: "2024-01-29T16:32:56.916Z",
    last_updated: "2024-01-29 08:32:56.916733-08",
    user_name: "audrey",
    description: "belly pain from food",
    category: "Digestion",
  },
  {
    id: 1,
    name: "headache",
    created_on: "2024-01-29T16:32:56.916Z",
    last_updated: "2024-01-29 08:32:56.916733-08",
    user_name: "audrey",
    description: "inflammation of the head",
    category: "Pain",
  },
  {
    id: 2,
    name: "insomnia",
    created_on: "2024-01-29T16:32:56.916Z",
    last_updated: "2024-01-29 08:32:56.916733-08",
    user_name: "audrey",
    description: "",
    category: "Sleep",
  },
  {
    id: 3,
    name: "brainfog",
    created_on: "2024-01-29T16:32:56.916Z",
    last_updated: "2024-01-29 08:32:56.916733-08",
    user_name: "audrey",
    description: "Difficulty thinking",
    category: "Cognition",
  },
  {
    id: 4,
    name: "low energy",
    created_on: "2024-01-29T16:32:56.916Z",
    last_updated: "2024-01-29 08:32:56.916733-08",
    user_name: "audrey",
    description: "malaise & depleted",
    category: null,
  },
];

export default function Home() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
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
      const response = await fetch("http://localhost:3001/lists/read/audrey");
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
      const response = await fetch("http://localhost:3001/symptoms/1");
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
        </SymptomsContext.Provider>
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
}
