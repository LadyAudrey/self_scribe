import { useState, useContext } from "react";

import { SymptomHistoryContext } from "../../Contexts/SymptomsHistoryContext";

export function ViewInstance(props) {
  const { created_on, id, intensity, notes } = props.instance;
  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );

  const [editingIntensity, setEditingIntensity] = useState(false);
  const [newIntensity, setNewIntensity] = useState(intensity);
  const [editingNotes, setEditingNotes] = useState(false);

  const createdOn = new Date(created_on);

  async function handleChangeIntensity(event) {
    event.preventDefault();
    setNewIntensity(event.target.value);
    const body = {
      created_on,
      intensity: newIntensity,
      notes,
    };
    try {
      console.log("in the try");
      const response = await fetch(`/symptoms/history/editInstance/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        setEditingIntensity(false);
        const editedInstance = symptomsHistory.find((element) => {
          return element.id === id;
        });
        editedInstance.intensity = body.intensity;
      } else {
        console.error("update was not successful");
      }
      setSymptomsHistory([...symptomsHistory, editingIntensity]);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteInstance() {
    event.preventDefault();
    try {
      const response = await fetch(`/symptoms/history/delete/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        const newInstancesHistory = symptomsHistory.filter((element) => {
          return id !== element.id;
        });
        setSymptomsHistory(newInstancesHistory);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <tbody>
        <tr className="w-max">
          <td className="px-5">{createdOn.toDateString()}</td>
          {!editingIntensity && (
            <td
              className="px-5"
              onDoubleClick={() => {
                setEditingIntensity(true);
              }}
            >
              {intensity}
            </td>
          )}
          {editingIntensity && (
            <div>
              <select
                name="intensity"
                onChange={handleChangeIntensity}
                defaultValue={0}
                className="block w-fit p-3 my-5 text-sm text-white border border-yellow-300 rounded-lg bg-yellow-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-900 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
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
            </div>
          )}
          <td className="px-5">
            {
              <img
                onClick={deleteInstance}
                src="/Buttons/delete.svg"
                className="w-8"
              />
            }
          </td>
        </tr>
        <tr className="w-max border-b-2 border-slate-500">
          <td className="ps-5 italic">{notes}</td>
        </tr>
      </tbody>
    </>
  );
}
