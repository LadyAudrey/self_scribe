"use client";

import { useState } from "react";

// Storing values to pass to back end
// client = {
//  "activites": {
//  dates: [values]
// }
// }

// I want to have lists and then activities within them. I'm wondering if I'll have one more component layer here, but I think this is workable for now

export function DisplayLists(props) {
  const [completed, setCompleted] = useState(false);
  const handleChange = () => {
    setCompleted(!completed);
  };
  // need to figure out why the first index is n't showing up from server.js to make legend text responsive

  const { data } = props;
  const listName = data[0];
  console.log(data);
  return (
    <fieldset>
      <legend className="text-2xl">TDL</legend>
      <h3>{listName}</h3>
      {data.map((task, index) => (
        <div>
          <div key={index}>
            <label>
              <input type="checkbox" onChange={handleChange} className="m-2" />
              {task}
            </label>
          </div>
        </div>
      ))}
    </fieldset>
  );
}

// read up on key for understanding TDL
