import { useState, useContext } from "react";

import EditString from "../EditString";
import EditFrequency from "./editFrequency";

import { TasksContext } from "../../Contexts/TasksContext";

// need how to activate the editing UI
// plan to go forward: We have outgrown EditString.jsx and need to do it locally

export function EditTask(props) {
  const { task, editingTask, setEditingTask } = props;

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskName, setTaskName] = useState(task.name);
  const [editingName, setEditingName] = useState(false);

  const [category, setCategory] = useState(task.category);
  const [repeating, setRepeating] = useState(task.repeats ?? false);

  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState(task.frequency?.split(":")[0] ?? "");
  console.log(task.frequency?.split(":")[0] ?? "", " EditTask num printout");
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState(task.frequency?.split(":")[1] ?? "");

  const [errorMsg, setErrorMsg] = useState("");

  function handleUpdateCategory(event) {
    setCategory(event.target.value);
    // TODO push category onto an array in the DB task via handleSaveChanges
  }

  function handleUpdateRepeating(event) {
    setRepeating(!repeating);
  }

  function handleEditChange() {
    setEditingTask(!editingTask);
  }

  async function handleSaveChanges(event) {
    event.preventDefault();
    // TODO setters for every UI input in here
    const body = {
      name: taskName,
      category,
      repeats: repeating,
      frequency: numOfNum + ":" + numOfDen,
    };
    // hook up to appropriate BE Fx's
    try {
      console.log("sending fetch", task);
      const response = await fetch(
        `http://localhost:3001/tasks/saveChanges/${task.id}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setEditingTask(false);
      } else {
        setErrorMsg("Update was not successful");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Update was not successful");
    }
  }

  // TODO: update all fetches with try catch blocks
  async function handleDelete(event) {
    event.preventDefault();
    console.log("handleDelete");
    // TODO need identifier from parent
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/delete/${task.id}`,
        {
          method: "POST",
        }
      );
      console.log(response, " tasks in Delete editTask.jsx");
      if (response.ok) {
        // delete from local storage
        const newTasks = tasks.filter((element) => {
          return task.id !== element.id;
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
        <fieldset>
          <legend className="flex flex-col my-4 gap-4">
            <div className="flex justify-between">
              {!editingName && (
                <h3
                  className="text-yellow-100 font-bold self-center"
                  onDoubleClick={() => {
                    setEditingName(true);
                  }}
                >
                  {taskName}
                </h3>
              )}
              {editingName && (
                <EditString
                  setEditingName={setEditingName}
                  id={task.id}
                  inputName={taskName}
                  setInputName={setTaskName}
                  state={tasks}
                  setState={setTasks}
                  structure={"tasks"}
                />
              )}
              <img
                onClick={handleEditChange}
                src="/Buttons/exit.svg"
                className="w-1/12"
              />
            </div>
            {/* How long would each instance be? (drop down) */}
            {/* Category (fill in the blank or dropdown) */}
            <div className="flex">
              {/* a drop down of user categories and an option to create a new one */}
              <h3>Category</h3>
              <label htmlFor="category">
                <select
                  className="bg-black"
                  name="category"
                  id="category-select"
                >
                  <option value="">Select a category</option>
                  <option value="self-care">Self Care</option>
                  <option value="groceries">Groceries</option>
                  <option value="Adulting">Adulting</option>
                </select>
              </label>
            </div>
            {/* Stay in list before desired rhythm recurs? (boolean) */}
            {/* Repeating? (boolean, hover effect) */}
            <div className="gap-2">
              <div className="flex">
                <h3>Repeating</h3>
                <input
                  type="checkbox"
                  name="repeating"
                  checked={repeating}
                  // placeholder="false"
                  onChange={handleUpdateRepeating}
                  className="bg-black w-fit rounded-md border-slate-800 border-2"
                ></input>
              </div>
              {repeating ? (
                <EditFrequency
                  numOfNum={numOfNum}
                  setNumOFNum={setNumOFNum}
                  numOfDen={numOfDen}
                  setNumOfDen={setNumOfDen}
                />
              ) : null}
            </div>
            <div className="flex justify-around">
              <button
                className="place-self-center editBtns"
                onClick={handleSaveChanges}
              >
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
            {errorMsg && <p className="text-center text-red-400">{errorMsg}</p>}
          </legend>
        </fieldset>
      </div>
    </>
  );
}
