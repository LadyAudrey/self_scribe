import { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomHistoryContext } from "../../Contexts/SymptomsHistoryContext";

import { EditBtn } from "../UI_Pieces/EditBtn";
import { EditSymptom } from "./EditSymptom";
import { ExitBtn } from "../UI_Pieces/ExitBtn";
import { AddSymptomInstance } from "./AddSymptomInstance";
import { ViewInstance } from "./ViewInstance";

export function Symptom(props) {
  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );
  const [editingSymptom, setEditingSymptom] = useState(false);
  const [addingInstance, setAddingInstance] = useState(false);
  const [seeInstances, setSeeInstances] = useState(false);

  return (
    <div className="flex gap-2 w-max">
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
          <div className="flex justify-between">
            <h5>{props.symptom.name}</h5>
            <ExitBtn
              setterFx={() => {
                setSeeInstances(false);
              }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th className="px-5">Date</th>
                <th className="px-5">Intensity</th>
                <th className="px-5">Delete</th>
              </tr>
            </thead>
            {symptomsHistory
              .filter((element) => {
                return element.symptom_id === props.symptom.id;
              })
              .map((instance) => {
                return (
                  <ViewInstance
                    instance={instance}
                    symptomName={props.symptom.name}
                    key={uuidv4()}
                  />
                );
              })}
          </table>
        </div>
      )}
      {!seeInstances && (
        <button
          className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
          onClick={() => {
            setSeeInstances(true);
          }}
        />
      )}
    </div>
  );
}
