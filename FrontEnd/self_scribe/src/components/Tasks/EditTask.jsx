import { useState, useContext } from "react";

import EditString from "../EditString";
import { TasksContext } from "../../Contexts/TasksContext";

// need how to activate the editing UI

export function EditTask(props) {
  const { taskId, editingTask, setEditingTask, taskName } = props;

  const { tasks, setTasks } = useContext(TasksContext);

  const [editingActName, setEditingActName] = useState(null);
  const [activityName, setActivityName] = useState(null);
  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState("#");
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState("#");
  const [duration, setDuration] = useState(1);
  const [category, setCategory] = useState("");
  const [Repeating, setRepeating] = useState(false);

  const handleUpdateNumFreq = (event) => {
    setNumOFNum(event.target.value);
    console.log(numOfNum);
  };

  const handleUpdateDen = (event) => {
    setNumOfDen(event.target.value);
    console.log(numOfDen);
  };

  function handleUpdateDuration(event) {
    setDuration(even.target.value);
  }

  function handleUpdateCategory(event) {
    setCategory(event.target.value);
  }

  function handleUpdateRepeating(event) {
    setRepeating(!Repeating);
  }

  function handleEditChange() {
    setEditingTask(!editingTask);
  }

  // TODO: update all fetches with try catch blocks
  async function handleDelete(event) {
    event.preventDefault();
    // TODO need identifier from parent
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/delete/${taskId}`,
        {
          method: "POST",
        }
      );
      console.log(response, " tasks in Delete editTask.jsx");
      if (response.ok) {
        // delete from local storage
        const newTasks = tasks.filter((task) => {
          return task.id !== taskId;
        });
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col w-fit text-white border-yellow-400 card">
        <div className="flex">
          <img
            onClick={handleEditChange}
            src="/Buttons/exit.svg"
            className="w-1/12"
          />
          <h3 className="text-yellow-100 font-bold self-center">{taskName}</h3>
        </div>
        <fieldset>
          <legend className="flex flex-col my-4 gap-4">
            {!editingActName && (
              <div
                onDoubleClick={() => {
                  setEditingActName(true);
                }}
              >
                {activityName}
              </div>
            )}
            {editingActName && (
              <Save
                ChangesEditString
                setEditingActName={setEditingActName}
                // id=?
                activityName={activityName}
                setActivityName={setActivityName}
                structure={"activity"}
              />
            )}
            <div className="flex">
              {/* Desired Frequency (x units in y time) */}
              <input
                type="number"
                name="numOfNum"
                value={numOfNum}
                onChange={handleUpdateNumFreq}
                className="bg-black w-fit rounded-md border-slate-800 border-2"
              ></input>
              {/* needs a drop down of units */}
              {/* <input
                  type="text"
                  name="newList"
                  value={listName}
                  onChange={handleAddListChange}
                  className="bg-black rounded-md mx-2 border-slate-800 border-2"
                ></input> */}
              <p className="flex">days every</p>
              <input
                type="number"
                name="numOfDen"
                value={numOfDen}
                onChange={handleUpdateDen}
                className="bg-black rounded-md mx-2 border-slate-800 border-2"
              ></input>
              {/* needs a drop down of units */}
              {/* <input
                  type="text"
                  name="newList"
                  value={listName}
                  onChange={handleAddListChange}
                  className="bg-black rounded-md mx-2 border-slate-800 border-2"
                ></input> */}
            </div>
            {/* How long would each instance be? (drop down) */}
            <div className="flex gap-2">
              <h3>Duration</h3>
              {/* drop down of #s */}
              <input
                type="number"
                name="duration"
                placeholder="ex: 1"
                value={duration}
                onChange={handleUpdateDuration}
                className="bg-black w-fit rounded-md border-slate-800 border-2"
              ></input>
              <p>days</p>
            </div>
            {/* Category (fill in the blank or dropdown) */}
            <div className="flex">
              <h3>Category</h3>
              {/* a drop down of user categories and an option to create a */}
              {/* <input
                type="text"
                name="category"
                placeholder="Ex: Self Care"
                value={category}
                onChange={handleUpdateCategory}
                className="userInput"
              ></input> */}
            </div>
            {/* Stay in list before desired rhythm recurs? (boolean) */}
            {/* Repeating? (boolean, hover effect) */}
            <div className="flex gap-2">
              <h3>Repeating</h3>
              <input
                type="checkbox"
                name="Repeating"
                value={Repeating}
                placeholder="false"
                onChange={handleUpdateRepeating}
                className="bg-black w-fit rounded-md border-slate-800 border-2"
              ></input>
            </div>
            <div className="flex justify-around">
              <button className="place-self-center editBtns">
                Save Changes
              </button>
              <button className="place-self-center editBtns">Pause</button>
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
