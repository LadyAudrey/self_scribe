"use client";

import { useState } from "react";



// Storing values to pass to back end
// client = {
//  "activites": {
  //  dates: [values]
  // }
  // }


export function TDL(props) {
  const [completed, setCompleted] = useState(false);
  const handleChange = () => {
    setCompleted(!completed);
  };
  const { data } = props;
  return (
    <fieldset>
      {/* create css class for legend styling */}
      <legend>TDL</legend>
      {data.map((task, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" onChange={handleChange} />
            {task}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

// read up on key for understanding TDL
