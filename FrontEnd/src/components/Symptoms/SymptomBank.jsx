import { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { Symptoms } from "./Symptoms";
import { AddSymptom } from "./AddSymptom";

import { CATEGORIES } from "../../App";

export function SymptomBank() {
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  const [addingSymptom, setAddingSymptom] = useState(false);

  function handleClick() {
    console.log("entered handleClick");
    setAddingSymptom(!addingSymptom);
  }

  return (
    <div className="side">
      <div className="text-2xl">Symptom Bank</div>
      <div className="card_data">
        {!symptoms && <h2>Data Pending</h2>}
        {symptoms.length &&
          CATEGORIES.map((category) => {
            const list = symptoms.filter((symptom) => {
              return symptom?.category === category;
            });
            return (
              <Symptoms symptoms={list} category={category} key={uuidv4()} />
            );
          })}
        {symptoms.length && (
          <Symptoms
            symptoms={symptoms.filter((symptom) => {
              return !symptom.category;
            })}
            key={uuidv4()}
          />
        )}
      </div>
      <div className="flex gap-5">
        {addingSymptom && <AddSymptom setAddingSymptom={setAddingSymptom} />}
        {!addingSymptom && (
          <button
            onClick={handleClick}
            className="bg-black p-3 my-5 rounded-lg border-solid border-yellow-400 border-2"
          >
            Add Symptom
          </button>
        )}
        <button className="bg-black p-3 my-5 rounded-lg border-solid border-yellow-400 border-2">
          Add Category
        </button>
      </div>
    </div>
  );
}
