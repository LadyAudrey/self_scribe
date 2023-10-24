import { Kudos } from "./components/Kudos";

// async function getCompleted(){
//   const res = await fetch("http://localhost:3001/completed")
//   if(!res.ok){
//     throw new Error("failed to fetch data")
//   }
//   return res.json()
// }

// function getCompleted() {
//   const aVariable = await fetch("http://localhost:3001/completed", {
//     method: "GET",
//     });
//     const data = aVariable.json()
//     console.log(aVariable);
//     return data;
//   }

// const data = getCompleted;

export default async function Home() {
  const res = await fetch("http://localhost:3001/completed");
  const data = await res.json();
  return (
    <main>
      <div className="flex flex-row justify-between editing text-slate-950">
        <div className="bg-gradient-to-b from-yellow-500 to-rose-500 border-green-400 card">
          <h2>TDL</h2>
        </div>
        <div className="bg-gradient-to-b from-green-500 to-yellow-500 border-green-400 card">
          <h2>Completed</h2>
          {/* <ol>
            {data.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ol> */}
          <Kudos data={data} />
        </div>
      </div>
    </main>
  );
}
