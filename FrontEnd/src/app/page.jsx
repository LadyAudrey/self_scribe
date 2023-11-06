import { DisplayLists } from "./components/DisplayLists";

export default async function Home() {
  const resTDL = await fetch("http://localhost:3001/TDL");
  const dataTDL = await resTDL.json();
  const res = await fetch("http://localhost:3001/completed");
  const kudosData = await res.json();
  return (
    <main>
      <div className="flex flex-row justify-between editing">
        {/* needs- figure out gradient stops */}
        <div className="bg-gradient-to-br from-yellow-500 via-slate-950 to-yellow-500 border-green-400 card">
          <DisplayLists data={dataTDL} />
        </div>
        <div className="bg-gradient-to-br from-green-500 via-slate-950 to-green-500 border-yellow-400 card">
          <DisplayLists data={kudosData} />
        </div>
      </div>
    </main>
  );
}
