import { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { ExitBtn } from "../UI_Pieces/ExitBtn";

import { CATEGORIES } from "../../App";

export function EditSymptom(props) {
  const { editingSymptom, setEditingSymptom, id, name, category, description } =
    props;

  const { symptoms, setSymptoms } = useContext(SymptomsContext);

  const [symptomName, setSymptomName] = useState(name);
  const [symptomCategory, setSymptomCategory] = useState();
  const [symptomDescription, setSymptomDescription] = useState(description);

  function handleEditChange() {
    setEditingSymptom(!editingSymptom);
  }

  async function handleSaveChanges(event) {
    event.preventDefault();
    const body = { name: symptomName, category, description };
    console.log(body);
    // try {
    //   const response = await fetch("http://localhost:3001/symptoms/bank/edit", {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (response.ok) {
    //     setEditingSymptom(false);
    //   } else {
    //     setErrorMsg("Update was not successful");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setErrorMsg("Update was not successful");
    // }
  }

  function handlePause() {}

  function handleDelete() {}

  return (
    <>
      <div className="flex flex-col w-fit text-white card">
        <ExitBtn setterFx={setEditingSymptom} />
        <fieldset>
          <legend className="flex flex-col my-4 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="category">
                <label className="flex">
                  Category
                  <select
                    type="text"
                    name="newSymptomCategory"
                    value={symptomCategory}
                    onChange={(event) => {
                      setSymptomCategory(event.target.value);
                    }}
                    className="bg-black rounded-md mx-2 border-slate-800 border-2"
                  >
                    <option value={""}>No Category</option>
                    {CATEGORIES.map((category) => {
                      return (
                        <option value={category} key={uuidv4()}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                cols="33"
                onChange={(event) => {
                  setSymptomDescription(event.target.value);
                }}
                defaultValue={symptomDescription}
                className="bg-black text-white"
              ></textarea>
            </div>
            <div className="flex justify-around">
              <button
                className="place-self-center editBtns"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="place-self-center editBtns"
                onClick={handlePause}
              >
                Pause
              </button>
              <button
                className="place-self-end editBtns"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </legend>
        </fieldset>
      </div>
    </>
  );
}
