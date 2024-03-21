import { useState, useContext } from "react";

import EditString from "./EditString";
import { TasksContext } from "../Contexts/TasksContext";

// need how to activate the editing UI

export function EditTask(props) {
  const { taskId, editingTask, setEditingTask } = props;

  const { tasks, setTasks } = useContext(TasksContext);

  const [editingActName, setEditingActName] = useState(null);
  const [activityName, setActivityName] = useState(null);
  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState("#");
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState("#");

  const handleUpdateNumFreq = (event) => {
    setNumOFNum(event.target.value);
    console.log(numOfNum);
  };

  const handleUpdateDen = (event) => {
    setNumOfDen(event.target.value);
    console.log(numOfDen);
  };

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
      console.log(response, " tasks in Delete edittask.jsx");
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
      {/* add exit button */}
      <div className="flex flex-col w-fit p-6 border-2 rounded-2 bg-blue-900 text-white border-yellow-400">
        <img
          onClick={handleEditChange}
          src="/Buttons/exit.svg"
          className="w-1/12"
        />
        <fieldset>
          <legend>
            <h3>{activityName}</h3>
            <div>
              {!editingActName && (
                <div
                  onDoubleClick={() => {
                    setEditingActName(true);
                    id;
                  }}
                >
                  {activityName}
                </div>
              )}
              {editingActName && (
                <EditString
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
              {/* Category (fill in the blank or dropdown) */}
              {/* TODO make category table */}
              {/* Stay in list before desired rhythm recurs? (boolean) */}
              {/* Active? (boolean, hover effect) */}
            </div>
            <div className="flex">
              <button className="place-self-centers mainBtns">
                Save Changes
              </button>
              <button
                className="place-self-end mainBtns"
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
