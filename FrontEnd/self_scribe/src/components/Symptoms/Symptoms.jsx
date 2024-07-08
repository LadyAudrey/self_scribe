import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Symptom } from "./Symptom";

export function Symptoms(props) {
  const { symptoms, category } = props;
  const [seeSymptoms, setSeeSymptoms] = useState(true);

  const handleVisibility = () => {
    setSeeSymptoms(!seeSymptoms);
  };

  return (
    <div>
      <div className="flex">
        <button className="visible" onClick={handleVisibility}></button>
        <h3>{category ?? "Miscellaneous"}</h3>
      </div>

      {seeSymptoms &&
        symptoms.length > 0 &&
        symptoms.map((symptom) => {
          return <div key={uuidv4()}>{symptom.name}</div>;
        })}
    </div>
  );
}
