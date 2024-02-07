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
            <div>
              {/* Desired Frequency (x units in y time) */}
              {/* How long would each instance be? (drop down) */}
              {/* Category (fill in the blank or dropdown) */}
              {/* TODO make category table */}
              {/* Stay in list before desired rhythm recurs? (boolean) */}
              {/* Active? (boolean, hover effect) */}
            </div>
            <div>
              <button>Save Changes</button>
            </div>
          </legend>
        </fieldset>
      </div>
    </>
  );
}
