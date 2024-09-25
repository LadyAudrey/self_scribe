import { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../../Contexts/SymptomsContext";
import { SymptomHistoryContext } from "../../../Contexts/SymptomsHistoryContext";
import { GraphItemsContext } from "../../../Contexts/GraphingItemsContext";

import { SymptomItem } from "./SymptomItem";
import { VisibleBtn } from "../../UI_Pieces/VisibleBtn";

export function SymptomSet() {
  const { symptoms } = useContext(SymptomsContext);
  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );
  const { graphItems, setGraphItems } = useContext(GraphItemsContext);
  const [seeSymptoms, setSeeSymptoms] = useState(true);

  const categoryToSymptomDict = {};

  for (let symptom of symptoms) {
    const currentCategory = symptom.category;

    if (currentCategory in categoryToSymptomDict) {
      // If the category exists, add the symptom to the existing array
      categoryToSymptomDict[currentCategory].push(symptom);
    } else {
      // If the category does not exist, initialize with an array containing this symptom
      categoryToSymptomDict[currentCategory] = [symptom];
    }
  }

  const categories = Object.keys(categoryToSymptomDict);

  function handleChecked(event, symptom) {
    console.log(symptom);
    const checked = Boolean(event.target.checked);
    if (checked) {
      console.log("event is true", checked);
      const symptoms = symptomsHistory.filter((symptomInstance) => {
        return symptom.id === symptomInstance.symptom_id;
      });
      setGraphItems([...graphItems, ...symptoms]);
    } else {
      console.log("event is false");
      const symptoms = graphItems.filter((symptomInstance) => {
        return symptom.id !== symptomInstance.symptom_id;
      });
      setGraphItems(symptoms);
    }
  }

  // logging undefined
  console.log(graphItems);

  return (
    <>
      <h3>Symptoms</h3>
      {categories.map((category) => {
        return (
          <div key={uuidv4()}>
            <h4>{category}</h4>
            {categoryToSymptomDict[category].map((symptom) => {
              return (
                <div className="flex px-3 gap-3" key={uuidv4()}>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      handleChecked(event, symptom);
                    }}
                  ></input>
                  <h4>{symptom.name}</h4>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
