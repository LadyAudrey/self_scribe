import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/Symptoms";
import { SymptomTypesContext } from "../../Contexts/SymptomType";

export function SymptomBank() {
  const { symptomType, setSymptomType } = useContext(SymptomTypesContext);
  return (
    <>
      <div className="text-2xl">Symptom Bank</div>
      {/* Symptom Types */}
      {/* Find Symptoms */}
    </>
  );
}
