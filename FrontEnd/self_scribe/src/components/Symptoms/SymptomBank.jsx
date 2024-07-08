import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/Symptoms";

import { Symptoms } from "./Symptoms";

import { CATEGORIES } from "../../App";

export function SymptomBank() {
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  return (
    <>
      <div className="text-2xl">Symptom Bank</div>
      <div>
        {!symptoms && <h2>Data Pending</h2>}
        {symptoms.length &&
          CATEGORIES.map((category) => {
            const list = symptoms.filter((symptom) => {
              console.log(symptom);
              return symptom?.category === category;
            });
            return <Symptoms symptoms={list} category={category} />;
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
    </>
  );
}
