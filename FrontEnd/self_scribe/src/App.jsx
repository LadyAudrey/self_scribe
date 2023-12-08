import "./App.css";

import { DisplayLists } from "./components/DisplayLists";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-slate-950 text-white">
      <h1>Self Watch</h1>
      <div>
        <DisplayLists />
      </div>
    </main>
  );
}
