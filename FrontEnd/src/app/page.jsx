import { Kudos } from "./components/Kudos";
import { TDL } from "./components/TDL";

export default async function Home() {
  const resTDL = await fetch("http://localhost:3001/TDL");
  const dataTDL = await resTDL.json();
  const res = await fetch("http://localhost:3001/completed");
  const kudosData = await res.json();
  return (
    <main>
      <div className="flex flex-row justify-between editing text-slate-950">
        <div className="bg-gradient-to-b from-yellow-500 to-rose-500 border-green-400 card">
          <TDL data={dataTDL} />
        </div>
        <div className="bg-gradient-to-b from-green-500 to-yellow-500 border-green-400 card">
          <h2>Completed</h2>
          <Kudos data={kudosData} />
        </div>
      </div>
    </main>
  );
}
