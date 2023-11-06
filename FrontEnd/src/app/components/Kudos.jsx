"use client";

import { useState } from "react";

export function Kudos(props) {
  const [completed, setCompleted] = useState(false);
  const { data } = props;
  const handleChange = () => setCompleted(!completed);
  return (
    <ol>
      {data.map((task, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" onChange={handleChange} />
            {task}
          </label>
        </div>
      ))}
    </ol>
  );
}
