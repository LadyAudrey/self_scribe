import { useContext, useState } from "react";

import { SymptomsContext } from "../../Contexts/SymptomsContext";
import { SymptomHistoryContext } from "../../Contexts/SymptomsHistoryContext";

import { ExitBtn } from "../UI_Pieces/ExitBtn";

export function AddSymptomInstance(props) {
  const [notes, setNotes] = useState("");
  const [intensityValue, setIntensityValue] = useState(0);
  const [fetching, setFetching] = useState(false);

  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );

  const onChangeIntensity = async (event) => {
    setIntensityValue(parseInt(event.target.value));
  };

  const onSubmitInstance = async () => {
    setFetching(true);
    try {
      const requestBody = {
        symptomId: props.id,
        intensity: parseInt(intensityValue),
        notes: notes,
      };
      const response = await fetch("/symptoms/history/add", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("failed to set intensity value");
      }
      const { id } = await response.json();
      setSymptomsHistory([
        ...symptomsHistory,
        {
          symptom_id: props.id,
          created_on: new Date(),
          intensity: requestBody.intensity,
          notes,
          id,
        },
      ]);
      props.setAddingInstance(false);
    } catch (error) {
      setFetching(false);
      console.error(error);
    }
  };
  return (
    <div className="card">
      <div className="flex">
        <h5>Describe the intensity of your symptom</h5>
        <ExitBtn
          setterFx={() => {
            props.setAddingInstance(false);
          }}
        />
      </div>
      <div className="flex justify-around align-middle">
        <select
          name="intensity"
          onChange={(event) => {
            onChangeIntensity(event);
          }}
          defaultValue={0}
          className="block w-fit p-3 my-5 text-sm text-white border border-yellow-300 rounded-lg bg-yellow-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-900 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <button
          className="addBtns"
          disabled={fetching}
          onClick={onSubmitInstance}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="5"
          cols="30"
          onChange={(event) => {
            setNotes(event.target.value);
          }}
          placeholder={"Whatever you'd like to know later..."}
          value={notes}
          className="bg-black text-white"
        ></textarea>
      </div>
    </div>
  );
}
