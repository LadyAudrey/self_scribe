"use client";

import { useState } from "react";

export function EditActivity(props) {
  const name = props.name;
  const [thisFeature, setThisFeature] = useState(false);
  const handleChange = () => {
    setThisFeature(!thisFeature);
  };
  return (
    <>
      <div className="flex flex-col w-1/2 p-6 border-2 rounded-2 text-white border-yellow-400">
        <fieldset>
          <legend>
            <h3>{name}</h3>
            {/* I want the user to say it is either (self care &&||  adulting) needs css for spacing*/}
            <p> Is this activity a</p>
            <div className="flex flex-row justify-around">
              <input type="checkbox" onChange={handleChange} />
              Selfcare
              <input type="checkbox" onChange={handleChange} />
              Adulting
              <input type="checkbox" onChange={handleChange} />
              Symptom
            </div>
            <div flex flex-row>
              {/* Why isn't the flex-row being respected? */}
              <div>
                <input type="checkbox" onChange={handleChange} />
                Nest Under
              </div>
              <p>dropdown</p>
            </div>
          </legend>
        </fieldset>
      </div>
    </>
  );
}
