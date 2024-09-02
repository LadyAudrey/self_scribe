import { useState } from "react";

import { EditBtn } from "../UI_Pieces/EditBtn";
import { EditSymptom } from "./EditSymptom";
import { AddSymptomInstance } from "./AddSymptomInstance";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { ViewInstances } from "./ViewInstances";

export function Symptom(props) {
  const [editingSymptom, setEditingSymptom] = useState(false);
  const [addingInstance, setAddingInstance] = useState(false);
  const [seeInstances, setSeeInstances] = useState(false);
  const [symptomInstances, getSymptomInstances] = useState([]);

  // const onChangeIntensity = async (event, symptomId) => {
  //   setIntensityValue(parseInt(event.target.value));
  //   try {
  //     if (parseInt(event.target.value) > 0) {
  //       const requestBody = {
  //         symptomId,
  //         intensity: parseInt(event.target.value),
  //         notes: notes,
  //       };
  //       const response = await fetch("/symptoms/history/add", {
  //         method: "POST",
  //         body: JSON.stringify(requestBody),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error("failed to set intensity value");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetch data
  async function fetchSymptomHistory() {
    try {
      const response = await fetch(`/symptoms/history/get/${props.symptom.id}`);
      console.log("symptomInstances Data", response);
      if (response.ok) {
        const result = await response.json();
        setSymptomInstances(result);
        console.log(symptomInstances);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex gap-2">
      <h4>{props.symptom.name}</h4>
      {addingInstance && (
        <AddSymptomInstance
          setAddingInstance={setAddingInstance}
          id={props.symptom.id}
        />
      )}
      {!addingInstance && (
        <button
          className="h-6 w-6 bg-cover bg-[url('/Buttons/add.svg')] z-10"
          onClick={() => {
            setAddingInstance(!addingInstance);
          }}
        />
      )}
      {editingSymptom && (
        <EditSymptom
          id={props.symptom.id}
          name={props.symptom.name}
          category={props.symptom.category}
          description={props.symptom.description}
          editingSymptom={editingSymptom}
          setEditingSymptom={setEditingSymptom}
        />
      )}
      {!editingSymptom && (
        <EditBtn setEditing={setEditingSymptom} editing={editingSymptom} />
      )}
      {seeInstances && (
        <div className="card">
          <ViewInstances
            symptomId={props.symptom.id}
            symptomName={props.symptom.name}
          />
        </div>
      )}
      {!seeInstances && (
        <button
          className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
          onClick={() => {
            setSeeInstances(true);
            fetchSymptomHistory(props.symptom.id);
          }}
        />
      )}
    </div>
  );
}
