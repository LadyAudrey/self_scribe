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
          <button onClick={handleClick} className="addBtns">
            Add Symptom
          </button>
        )}
        <button className="addBtns">Add Category</button>
      </div>
    </div>
  );
}
