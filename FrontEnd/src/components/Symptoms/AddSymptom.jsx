import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { CATEGORIES } from "../../App";

export function AddSymptom(props) {
  const { setAddingSymptom } = props;
  const [symptomName, setSymptomName] = useState("");
  const [symptomCategory, setSymptomCategory] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");

  const handleAddSymptom = async (event) => {
    event.preventDefault();
    console.log({
      symptomName,
      symptomCategory,
      symptomDescription,
    });
    // create fetch
    try {
      const requestBody = {
        // need to hardcode userId as 1
        // names on the backend have to be proper types and names
        userId: 1,
        name: symptomName,
        category: symptomCategory,
        intensity: parseInt(event.target.value),
        description: symptomDescription,
      };
      await fetch("/symptoms/bank/create", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
    setAddingSymptom(false);
  };

  return (
    <>
      <div className="flex flex-col card border-slate-400">
        <img
          onClick={() => {
            setAddingSymptom(false);
          }}
          src="/Buttons/exit.svg"
          className="w-1/12"
        />
        <form
          onSubmit={handleAddSymptom}
          className="self-end flex flex-col gap-5"
        >
          <label className="flex flex-col">
            Symptom Name
            <input
              type="text"
              name="newSymptom"
              placeholder="New Symptom Name"
              value={symptomName}
              onChange={(event) => {
                setSymptomName(event.target.value);
              }}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <label className="flex flex-col">
            Symptom Category
            <select
              type="text"
              name="newSymptomCategory"
              value={symptomCategory}
              onChange={(event) => {
                setSymptomCategory(event.target.value);
              }}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            >
              <option value={""}>No Category</option>
              {CATEGORIES.map((category) => {
                return (
                  <option value={category} key={uuidv4()}>
                    {category}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col">
            Symptom Description
            <input
              type="text"
              name="newSymptomDescription"
              placeholder="Symptom"
              value={symptomDescription}
              onChange={(event) => {
                setSymptomDescription(event.target.value);
              }}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <button type="submit">Add Symptom</button>
        </form>
      </div>
    </>
  );
}
