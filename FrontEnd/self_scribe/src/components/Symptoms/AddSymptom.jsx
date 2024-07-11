import { useContext } from "react";
import { useState } from "react";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

export default function AddSymptom(props) {
  const { setAddingSymptom, userId } = props;
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  const [newSymptom, setNewSymptom] = useState();
  const [symptomName, setSymptomName] = useState("");
  const [symptomCategory, setSymptomCategory] = useState("");
  const [symptomDescription, setSymptomDescription] = useState("");

  function handleAddSymptom(event) {
    const newSymptom = {
      userId,
      // note: need to update below data pieces to be taken from the event
      symptomName,
      category,
      description,
    };
    setNewSymptom(newSymptom);
    setAddingSymptom(false);
  }

  return (
    <>
      <div className="flex flex-col card border-slate-400">
        <img
          onClick={setAddingSymptom(false)}
          src="/Buttons/exit.svg"
          className="w-1/12"
        />
        <form
          onSubmit={handleAddSymptom()}
          className="self-end flex flex-col gap-5"
        >
          <label className="flex flex-col">
            Symptom Name
            <input
              type="text"
              name="newSymptom"
              placeholder="New Symptom Name"
              value={symptomName}
              onChange={setSymptomName}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <label className="flex flex-col">
            Symptom Category
            <input
              type="text"
              name="newSymptomCategory"
              placeholder="Ex: Sleep"
              value={category}
              onChange={setSymptomCategory}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <label className="flex flex-col">
            Symptom Description
            <input
              type="text"
              name="newSymptomDescription"
              placeholder="Symptom"
              value={description}
              onChange={setSymptomDescription}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <button type="submit">Add Symptom</button>
        </form>
      </div>
    </>
  );
}
