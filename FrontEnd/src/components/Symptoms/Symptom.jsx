import { useState } from "react";

import { EditBtn } from "../UI_Pieces/EditBtn";
import { EditSymptom } from "./EditSymptom";
import AddSymptomInstance from "./AddSymptomInstance";

export function Symptom(props) {
  const [editingSymptom, setEditingSymptom] = useState(false);
  const [addingInstance, setAddingInstance] = useState(false);

  const onChangeIntensity = async (event, symptomId) => {
    setIntensityValue(parseInt(event.target.value));
    try {
      if (parseInt(event.target.value) > 0) {
        const requestBody = {
          symptomId,
          intensity: parseInt(event.target.value),
          notes: notes,
        };
        const response = await fetch("/symptoms/history/add", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("failed to set intensity value");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    </div>
  );
}
