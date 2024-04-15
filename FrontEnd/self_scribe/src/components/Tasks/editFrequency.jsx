import { useState } from "react";

export default function EditFrequency(props) {
  const { numOfNum, setNumOFNum, numOfDen, setNumOfDen } = props;

  const handleUpdateNumFreq = (event) => {
    setNumOFNum(event.target.value);
  };

  const handleUpdateDen = (event) => {
    setNumOfDen(event.target.value);
  };

  function handleUpdateDuration(event) {
    setDuration(even.target.value);
  }

  return (
    <>
      <div className="wi-fit flex m-5 items-center">
        {/* Desired Frequency (x units in y time) */}
        <input
          type="number"
          name="numOfNum"
          value={numOfNum}
          onChange={handleUpdateNumFreq}
          className="bg-black w-1/12 rounded-md border-slate-800 p-1 border-2"
        ></input>
        <p className="flex">days every</p>
        <input
          type="number"
          name="numOfDen"
          value={numOfDen}
          onChange={handleUpdateDen}
          className="bg-black w-1/12 rounded-md mx-2 border-slate-800 border-2"
        ></input>
        <p>days</p>
      </div>
    </>
  );
}
