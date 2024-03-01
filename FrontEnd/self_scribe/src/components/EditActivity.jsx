"use client";

import { useState, useContext } from "react";

import EditString from "./EditString";

export function EditActivity(props) {
  const listName = props.listName;
  const [activityName, setActivityName] = useState(null);
  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState("#");
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState("#");

  const handleUpdateNumFreq = (event) => {
    setNumOFNum(event.target.value);
    console.log(numOfNum);
  };

  const handleUpdateDen = (event) => {
    setNumOfDen(event.target.value);
    console.log(numOfDen);
  };

  return (
    <>
      <div className="flex flex-col w-fit p-6 border-2 rounded-2 bg-blue-900 text-white border-yellow-400">
        <fieldset>
          <legend>
            <h3>{listName}</h3>
            <div>
              {/* Desired Frequency (x units in y time) */}
              <div className="flex">
                <input
                  type="number"
                  name="numOfNum"
                  value={numOfNum}
                  onChange={handleUpdateNumFreq}
                  className="bg-black w-fit rounded-md border-slate-800 border-2"
                ></input>
                {/* needs a drop down of units */}
                {/* <input
                  type="text"
                  name="newList"
                  value={listName}
                  onChange={handleAddListChange}
                  className="bg-black rounded-md mx-2 border-slate-800 border-2"
                ></input> */}
                <p className="flex">days every</p>
                <input
                  type="number"
                  name="numOfDen"
                  value={numOfDen}
                  onChange={handleUpdateDen}
                  className="bg-black rounded-md mx-2 border-slate-800 border-2"
                ></input>
                {/* needs a drop down of units */}
                {/* <input
                  type="text"
                  name="newList"
                  value={listName}
                  onChange={handleAddListChange}
                  className="bg-black rounded-md mx-2 border-slate-800 border-2"
                ></input> */}
              </div>
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
