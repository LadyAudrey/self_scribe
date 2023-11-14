import Link from "next/link";
import Image from "next/image";

import { DisplayLists } from "./components/DisplayLists";

const name = "Meditation";

export default async function Home() {
  // I tried to turn these into state via useState, but  got this error:
  // Error: async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
  const resTDL = await fetch("http://localhost:3001/TDL");
  const dataTDL = await resTDL.json();
  const res = await fetch("http://localhost:3001/completed");
  const kudosData = await res.json();
  console.log(Array.isArray(kudosData));
  return (
    <main>
      <div className="flex flex-row justify-between editing">
        <Link href="/lists">
          <Image
            src="/Buttons/List.svg"
            height={200}
            width={200}
            className="fixed right-0 top-0 sm:m-5 btn-fx"
            alt="hamburger menu"
          />
        </Link>
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
