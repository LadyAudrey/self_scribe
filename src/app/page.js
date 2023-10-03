export default function Home() {
  return (
    <main>
      <div className=" flex flex-row justify-between editing text-slate-950">
        <div  className="w-2/5 sm:min-h-fit p-10 bg-gradient-to-b from-yellow-500 to-rose-500 border-solid border-green-400 border-4 rounded-lg font-bold">
          <h2>TDL</h2>
        </div>
        <div className="w-2/5 sm:min-h-fit p-10 bg-gradient-to-b from-green-500 to-yellow-500 border-solid border-green-400 border-2 rounded-lg font-bold" >
          <h2>Completed</h2>
        </div>
      </div>
    </main>
  );
}
