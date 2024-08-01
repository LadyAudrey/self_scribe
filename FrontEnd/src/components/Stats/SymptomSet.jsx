import { v4 as uuidv4 } from "uuid";

import { SypmptomItem } from "./SypmptomItem";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";

export function SymptomSet(props) {
  const { symptoms } = props;
  return (
    <>
      {symptoms.map((symptom) => {
        return <SypmptomItem key={uuidv4()} itemID={symptom.name} />;
      })}
    </>
  );
}
