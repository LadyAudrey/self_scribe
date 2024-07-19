import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { Symptom } from "./Symptom";

export function Symptoms(props) {
  const { symptoms, category } = props;
  const [seeSymptoms, setSeeSymptoms] = useState(true);
  const [intensityValue, setIntensityValue] = useState(0);

  const handleVisibility = () => {
    setSeeSymptoms(!seeSymptoms);
  };

  const onChangeIntensity = async (event, symptomId) => {
    setIntensityValue(parseInt(event.target.value));
    try {
      if (parseInt(event.target.value) > 0) {
        const requestBody = {
          symptomId,
          intensity: parseInt(event.target.value),
        };
        const response = await fetch(
          "http://localhost:3001/symptoms/history/add",
          {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("do something");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
