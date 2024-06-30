import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/Symptoms";
import { SymptomTypesContext } from "../../Contexts/SymptomType";

import { SymptomsList } from "./SymptomsList";

export function SymptomBank() {
  // not importing properly via useContext(), using dummy data
  const { symptomType, setSymptomType } = useState(SymptomTypesContext);
  setSymptomType(["digestion", "inflamation"]);
  console.log("symptomtype", symptomType);
  return (
    <>
      <div className="text-2xl">Symptom Bank</div>
      {/* Symptom Types */}
      <div>
        {!symptomType && <h2>Data Pending</h2>}
        {symptomType.length &&
          symptomType.map((list) => {
            return <SymptomList />;
          })}
      </div>
      {/* Find Symptoms */}
    </>
  );
}
