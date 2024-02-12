import { useState, useEffect } from "react";

import "./App.css";

import { ListsContext } from "./Contexts/ListsContext";

import { DisplayLists } from "./components/DisplayLists";

export default function Home() {
  const [lists, setLists] = useState([]);

  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/getLists/audrey");
    const result = await response.json();
    setLists(result.lists);
    console.log(result);
  }

  return (
    // TODO: background gradient file not working
    <ListsContext.Provider value={{ lists, setLists }}>
      <main className="h-screen w-screen mainBg text-white">
        <header className="flex justify-between">
          <div>
            <button className="mainBtns">Lists</button>
            {/* this will load the load the lists page */}
            <button className="mainBtns">Symptoms</button>
            {/* this will load the symptoms page */}
            <button className="mainBtns">Graphs</button>
            {/* this will load the graphing page */}
          </div>
          <div>
            <button className="mainBtns">Settings</button>
            {/* this will load the Settings for the app */}
          </div>
        </header>
        <div>
          <DisplayLists />
          {/* <DisplaySymptoms /> */}
        </div>
        <footer className="flex place-content-center w-screen fixed inset-x-0 bottom-0 p-10">
          <h1 className="text-4xl">Self Scribe</h1>
        </footer>
      </main>
    </ListsContext.Provider>
  );
}

// hw- replace useContext for prop drilling for lists
// commenting out components that are not working
