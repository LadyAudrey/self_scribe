import { useState } from "react";

import "./App.css";

import { DisplayLists } from "./components/DisplayLists";
import { DisplaySymptoms } from "./components/DisplaySymptoms";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-emerald-950 text-white">
      <header className="flex justify-between">
        <div>
          <button>Lists</button>
          {/* this will load the load the lists page */}
          <button>Symptoms</button>
          {/* this will load the symptoms page */}
          <button>Graphs</button>
          {/* this will load the graphing page */}
        </div>
        <div>
          <button>Settings</button>
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
  );
}
