import { useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { CATEGORIES } from "../../App";
import { SymptomsContext } from "../../Contexts/SymptomsContext";
import { SymptomHistoryContext } from "../../Contexts/SymptomsHistoryContext";

import { ViewInstance } from "./ViewInstance";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";

export function TodaysSymptoms() {
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );
  const todaysInstances = [];
  const todaysSymptomsSet = new Set();

  const [seeDaySymptoms, setSeeDaySymptoms] = useState(true);
  const handleVisibility = () => {
    setSeeDaySymptoms(!seeDaySymptoms);
  };

  for (let instance = 0; instance < symptomsHistory.length; instance++) {
    const instanceDate = new Date(symptomsHistory[instance].created_on);
    const todaysDate = new Date();
    if (
      instanceDate.getDate() == todaysDate.getDate() &&
      instanceDate.getMonth() == todaysDate.getMonth() &&
      instanceDate.getFullYear() == instanceDate.getFullYear()
    ) {
      todaysInstances.push(symptomsHistory[instance]);
      todaysSymptomsSet.add(symptomsHistory[instance].symptom_id);
    }
  }

  return (
    <div>
      <div className="title text-2xl">Todays' Symptoms</div>
      <div className="card_data">
        {CATEGORIES.map((category) => {
          if (todaysSymptomsSet.size == 0) {
            return <div key={uuidv4()}></div>;
          }
          return symptoms
            .filter((symptom) => {
              return (
                todaysSymptomsSet.has(symptom.id) &&
                category === symptom.category
              );
            })
            .map((symptom) => {
              return (
                <div className="card_data">
                  <h2>{category}</h2>
                  <div className="flex gap-5">
                    <h3 className="title">{symptom.name}</h3>
                    <VisibleBtn
                      setVisible={setSeeDaySymptoms}
                      visible={seeDaySymptoms}
                    />
                  </div>
                </div>
              );
            });
        })}
      </div>
    </div>
  );
}
