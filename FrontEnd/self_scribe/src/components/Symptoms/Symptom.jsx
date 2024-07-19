import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { EditBtn } from "../UI_Pieces/EditBtn";
import { EditSymptom } from "./EditSymptom";

export function Symptom(props) {
  const [editingSymptom, setEditingSymptom] = useState(false);
  return (
    <div className="flex gap-2">
      <h4>{props.symptom.name}</h4>
      {/* TODO create change handler */}
      <select
        name="intensity"
        onChange={(event) => {
          onChangeIntensity(event, props.symptom.id);
        }}
        defaultValue={0}
        className="block w-fit p-2 mb-6 text-sm text-white border border-yellow-300 rounded-lg bg-yellow-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-900 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {/* TDL fill in up to 9 */}
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
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
