import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { Symptom } from "./Symptom";

export function Symptoms(props) {
  const { symptoms, category } = props;
  const [seeSymptoms, setSeeSymptoms] = useState(true);

  return (
    <div className="">
      <div className="flex gap-5">
        <VisibleBtn setVisible={setSeeSymptoms} visible={seeSymptoms} />
        <h3>{category ?? "Miscellaneous"}</h3>
      </div>

      {seeSymptoms &&
        symptoms.length > 0 &&
        symptoms.map((symptom) => {
          return <Symptom symptom={symptom} key={uuidv4()} />;
        })}
    </div>
  );
}
