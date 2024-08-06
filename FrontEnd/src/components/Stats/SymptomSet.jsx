import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { SypmptomItem } from "./SypmptomItem";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { useContext } from "react";

export function SymptomSet(props) {
  const { graphingItems, setGraphingItems } = props;
  const { symptoms } = useContext(SymptomsContext);
  return (
    <>
      {symptoms.map((symptom) => {
        return <SypmptomItem key={uuidv4()} itemID={symptom.name} />;
      })}
    </>
  );
}
