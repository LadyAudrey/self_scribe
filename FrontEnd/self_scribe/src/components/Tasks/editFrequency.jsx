import { useState } from "react";

export default function EditFrequency() {
  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState("#");
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState("#");
  const [duration, setDuration] = useState(1);

  const handleUpdateNumFreq = (event) => {
    setNumOFNum(event.target.value);
    console.log(numOfNum);
  };

  const handleUpdateDen = (event) => {
    setNumOfDen(event.target.value);
    console.log(numOfDen);
  };

  function handleUpdateDuration(event) {
    setDuration(even.target.value);
  }

  return (
    <>
      <div className="wi-fit flex m-5">
        {/* Desired Frequency (x units in y time) */}
        <input
          type="number"
          name="numOfNum"
          value={numOfNum}
          onChange={handleUpdateNumFreq}
          className="bg-black w-1/4 rounded-md border-slate-800 border-2"
        ></input>
        <p className="flex">days every</p>
        <input
          type="number"
          name="numOfDen"
          value={numOfDen}
          onChange={handleUpdateDen}
          className="bg-black w-1/4 rounded-md mx-2 border-slate-800 border-2"
        ></input>

        <p>days</p>
      </div>
    </>
  );
}
