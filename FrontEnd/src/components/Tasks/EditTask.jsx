import { useState, useContext } from "react";

import { TasksContext } from "../../Contexts/TasksContext";

import { ExitBtn } from "../UI_Pieces/ExitBtn";

import Frequency from "./Frequency";

export function EditTask(props) {
  const { task, editingTask, setEditingTask } = props;

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskName, setTaskName] = useState(task.name);
  const [editingName, setEditingName] = useState(false);

  const [category, setCategory] = useState(task.category ?? "");
  const [repeating, setRepeating] = useState(task.repeats ?? false);

  // named as such because it's the top number when saying "3 days in a week" - 3/7 *the numerator*
  const [numOfNum, setNumOFNum] = useState(
    task.frequency?.split(":")[0] ?? "1"
  );
  // named as such because it's the top number when saying "7 days in a week" - 3/7 *the denominator*
  const [numOfDen, setNumOfDen] = useState(
    task.frequency?.split(":")[1] ?? "0"
  );

  const [errorMsg, setErrorMsg] = useState("");

  function handleUpdateRepeating() {
    setRepeating(!repeating);
  }

  function handleEditChange() {
    setEditingTask(!editingTask);
  }

  async function handleSaveChanges(event) {
    event.preventDefault();
    const body = {
      name: taskName,
      category,
      repeats: repeating,
      frequency: numOfNum + ":" + numOfDen,
    };
    try {
      const response = await fetch(`/tasks/saveChanges/${task.id}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setEditingTask(false);
        const editedTask = tasks.find((element) => {
          return element.id === task.id;
        });
        editedTask.name = body.name;
        editedTask.category = body.category;
        editedTask.repeats = body.repeats;
        editedTask.frequency = body.frequency;
        const filteredTasks = tasks.filter((element) => {
          return element.id !== task.id;
        });
        setTasks([...filteredTasks, editedTask]);
      } else {
        setErrorMsg("Update was not successful");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Update was not successful");
    }
  }

  async function handlePause(event) {
    event.preventDefault();
    setRepeating(!repeating);
    try {
      const response = await fetch(`/tasks/pause/${task.id}`, {
        method: "POST",
      });
      if (response.ok) {
        setRepeating(!repeating);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    // TODO need identifier from parent
    try {
      const response = await fetch(`/tasks/delete/${task.id}`, {
        method: "POST",
      });
      if (response.ok) {
        const newTasks = tasks.filter((element) => {
          return task.id !== element.id;
        });
        setTasks(newTasks);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col w-fit text-white card">
        <fieldset>
          <legend className="flex flex-col my-4 gap-4">
            <div className="flex justify-between">
              {!editingName && (
                <h3
                  onDoubleClick={() => {
                    setEditingName(true);
                  }}
                >
                  {taskName}
                </h3>
              )}
              {editingName && (
                <div>
                  <input
                    autoFocus
                    value={taskName}
                    className="bg-black text-3xl"
                    onChange={(event) => {
                      setTaskName(event.target.value);
                    }}
                  />
                </div>
              )}
              <ExitBtn setterFx={handleEditChange} />
            </div>
            <div className="flex items-center gap-2">
              <h4>Category</h4>
              <label htmlFor="category">
                <select
                  className="bg-black p-2"
                  name="category"
                  id="category-select"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                  defaultValue={category}
                >
                  <option value="">Select a category</option>
                  <option value="self-care">Self Care</option>
                  <option value="groceries">Groceries</option>
                  <option value="Adulting">Adulting</option>
                </select>
              </label>
            </div>
            <div className="gap-2">
              <div className="flex gap-2">
                <h4>Repeating</h4>
                <input
                  type="checkbox"
                  name="repeating"
                  checked={repeating}
                  onChange={handleUpdateRepeating}
                  className="bg-black w-fit rounded-md border-slate-800 border-2"
                ></input>
              </div>
              {repeating && (
                <Frequency
                  numOfNum={numOfNum}
                  setNumOFNum={setNumOFNum}
                  numOfDen={numOfDen}
                  setNumOfDen={setNumOfDen}
                />
              )}
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
            {errorMsg && <p className="text-center text-red-400">{errorMsg}</p>}
          </legend>
        </fieldset>
      </div>
    </>
  );
}
