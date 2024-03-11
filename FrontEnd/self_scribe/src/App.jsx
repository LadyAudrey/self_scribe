import { useState, useEffect } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";

import { DisplayLists } from "./components/DisplayLists";
import { Graphs } from "./components/Graphs";

export default function Home() {
  const [lists, setLists] = useState([]);
  const [pageTab, setPageTab] = useState("DisplayLists");

  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/lists/read/audrey");
    const result = await response.json();
    setLists(result);
    console.log(result);
  }

  return (
    // TODO: background gradient file not working
    <ListsContext.Provider value={{ lists, setLists }}>
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
            <button className="mainBtns" onClick={() => setPageTab("Symptoms")}>
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
        <div>
          <DisplayLists />
        </div>
        <footer className="flex place-content-center w-screen fixed inset-x-0 bottom-0 p-10">
          <h1 className="text-4xl">Self Scribe</h1>
        </footer>
      </main>
    </ListsContext.Provider>
  );
}
