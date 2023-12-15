"use client";
import { useState } from "react";

export default function EditList(props) {
  const [listName, activities] = props;

  return (
    <>
      {/* needs background to be correct gradient */}
      <div className="flex flex-col bg-gradient-to-br from-rose-400 via-slate-900 via-30% to-rose-400 to-90% card border-slate-400">
        <fieldset>
          <legend className="card_data text-2xl">Edit {listName}</legend>
          {activities.map((task, index) => (
            <div key={index} className="flex my-5">
              <p className="mr-3">{task}</p>
              <button>Edit</button>
            </div>
          ))}
        </fieldset>
        <div className="flex flex-row justify-around text-yellow-200">
          <button className="bg-slate-900">Pause</button>
          <button className="bg-slate-900">Delete</button>
        </div>
      </div>
    </>
  );
}
