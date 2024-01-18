import { useState } from "react";

import "./App.css";

import { DisplayLists } from "./components/DisplayLists";

export default function Home() {


  return (
    <main className="h-screen w-screen bg-emerald-950 text-white">
      <header className="flex">
        <div>
          <button>Lists</button>
        </div>
        <div>
          <button>Symptoms</button>
          {/* this will load the symptoms page */}
        </div>
        <div>
          <button>Graphs</button>
          {/* this will load the graphing page */}
        </div>
      </header>
      <div>
        <DisplayLists />
      </div>
      <footer className="flex justify-between w-screen fixed inset-x-0 bottom-0">
        <div>
          <button type="submit">Home</button>
          {/* this will return to the home or lists page (undecided) */}
        </div>
        <h1 className="text-4xl">Self Watch</h1>
        <div>
          <button type="submit">Settings</button>
          {/* this will load the Settings page */}
        </div>
      </footer>
    </main>
  );
}
