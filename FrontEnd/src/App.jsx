import { useState, useEffect, useRef } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";
import { TasksContext } from "./Contexts/TasksContext";
import { TaskHistoryContext } from "./Contexts/TaskHistoryContext";
import { SymptomsContext } from "./Contexts/SymptomsContext";
import { SymptomHistoryContext } from "./Contexts/SymptomsHistoryContext";

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
  const [symptomsHistory, setSymptomsHistory] = useState([]);
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
      const tasks = await fetchTasks(result);
      setLists(result);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTasks(lists) {
    const tasks = [];

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const response = await fetch(`/tasks/read/${list.id}/`);
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
  async function fetchSymptoms() {
    try {
      const response = await fetch("/symptoms/bank/1");
      if (response.ok) {
        const result = await response.json();
        setSymptoms(result);
        fetchSymptomHistory(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchSymptomHistory(symptoms) {
    const localSymptomInstances = [];
    for (let i = 0; i < symptoms.length; i++) {
      try {
        const response = await fetch(`/symptoms/history/${symptoms[i].id}`);
        if (response.ok) {
          const result = await response.json();
          localSymptomInstances.push(...result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setSymptomsHistory(localSymptomInstances);
  }

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <TaskHistoryContext.Provider value={{ taskHistory, setTaskHistory }}>
          <SymptomsContext.Provider value={{ symptoms, setSymptoms }}>
            <SymptomHistoryContext.Provider
              value={{ symptomsHistory, setSymptomsHistory }}
            >
              <main className="h-screen w-screen text-white">
                <header className="flex justify-between">
                  <div>
                    <button
                      className="mainBtns"
                      onClick={() => setPageTab(PAGE_KEYS.DISPLAY_LISTS)}
                    >
                      Lists
                    </button>
                    <button
                      className="mainBtns"
                      onClick={() => setPageTab(PAGE_KEYS.SYMPTOMS)}
                    >
                      Symptoms
                    </button>
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
                <footer className="flex place-content-center w-screen p-10">
                  <h1 className="text-4xl">Self Scribe</h1>
                </footer>
              </main>
            </SymptomHistoryContext.Provider>
          </SymptomsContext.Provider>
        </TaskHistoryContext.Provider>
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
}
