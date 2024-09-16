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
  const [symptomCategory, setSymptomCategory] = useState(category);
  const [symptomDescription, setSymptomDescription] = useState(description);

  function handleExitEdit() {
    setEditingSymptom(!editingSymptom);
  }

  async function handleSaveChanges(event) {
    event.preventDefault();
    const body = {
      id,
      name: symptomName,
      category: symptomCategory,
      description: symptomDescription,
    };
    try {
      const response = await fetch("/symptoms/bank/edit", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const newSymptom = symptoms.filter((element) => {
          return element.id === id;
        })[0];
        const newSymptoms = symptoms.filter((element) => {
          return element.id !== id;
        });
        newSymptom.name = symptomName;
        newSymptom.category = symptomCategory;
        newSymptom.description = symptomDescription;
        setSymptoms([...newSymptoms, newSymptom]);
        setEditingSymptom(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      const response = await fetch(`/symptoms/bank/delete/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        console.log("entered ok");
        const newSymptoms = symptoms.filter((element) => {
          return id !== element.id;
        });
        setSymptoms(newSymptoms);
      }
    } catch (error) {
      console.error(error);
    }
    setEditingSymptom(false);
  }

  return (
    <>
      <div className="flex flex-col w-fit text-white card">
        <ExitBtn setterFx={handleExitEdit} />
        <fieldset>
          <legend className="flex flex-col my-4 gap-4">
            <div>
              <input
                autoFocus
                value={symptomName}
                className="bg-black text-3xl"
                onChange={(event) => {
                  setSymptomName(event.target.value);
                }}
              />
            </div>
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
