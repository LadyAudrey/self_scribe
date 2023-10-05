export default function Home() {
  return (
    <main>
      <div className=" flex flex-row justify-between editing text-slate-950">
        <div className="bg-gradient-to-b from-yellow-500 to-rose-500 border-green-400 card">
          <h2>TDL</h2>
        </div>
        <div className="bg-gradient-to-b from-green-500 to-yellow-500 border-green-400 card">
          <h2>Completed</h2>
        </div>
      </div>
    </main>
  );
}
