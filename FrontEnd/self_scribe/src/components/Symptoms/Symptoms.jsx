import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

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
    <div>
      <div className="flex">
        <button className="visible" onClick={handleVisibility}></button>
        <h3>{category ?? "Miscellaneous"}</h3>
      </div>

      {seeSymptoms &&
        symptoms.length > 0 &&
        symptoms.map((symptom) => {
          return (
            <div className="flex gap-2" key={uuidv4()}>
              <div key={uuidv4()}>{symptom.name}</div>
              <select
                name="intensity"
                onChange={(event) => {
                  onChangeIntensity(event, symptom.id);
                }}
                defaultValue={0}
              >
                {/* TDL fill in up to 9 */}
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          );
        })}
    </div>
  );
}
