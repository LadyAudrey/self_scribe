import { useContext, useEffect } from "react";

export function Kudos(kudos) {
  console.log(kudos);
  return (
    <>
      <fieldset>
        <legend className="legend title">Kudos!</legend>
        {kudos.kudos.kudos.map((task, index) => (
          <div key={index}>
            <h3>{task.name}</h3>
            {/* <label htmlFor={task.name} className="legend-title">
              {task.name}
            </label> */}
            <button>Edit</button>
          </div>
        ))}
      </fieldset>
    </>
  );
}
