import { useState } from "react";

import "./App.css";

import { DisplayLists } from "./components/DisplayLists";
// import { DisplaySymptoms } from "./components/DisplaySymptoms";

export default function Home() {
  return (
    // TODO: background gradient file not working
    <main className="h-screen w-screen bg-['./src/assets/BGgradient.svg')] bg-cover text-white">
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
  );
}
