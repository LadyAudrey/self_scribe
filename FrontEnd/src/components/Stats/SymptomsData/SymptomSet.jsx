import { useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../../Contexts/SymptomsContext";

import { SypmptomItem } from "./SymptomItem";
import { VisibleBtn } from "../../UI_Pieces/VisibleBtn";

export function SymptomSet() {
  const { symptoms } = useContext(SymptomsContext);
  return (
    <>
      {symptoms.map((symptom) => {
        return <SypmptomItem key={uuidv4()} itemID={symptom.name} />;
      })}
    </>
  );
}
