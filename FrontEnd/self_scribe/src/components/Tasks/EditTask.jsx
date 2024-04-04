import { useState, useContext } from "react";

import EditString from "../EditString";
import EditFrequency from "./editFrequency";

import { TasksContext } from "../../Contexts/TasksContext";

// need how to activate the editing UI

export function EditTask(props) {
  const { task, editingTask, setEditingTask } = props;

  const { tasks, setTasks } = useContext(TasksContext);
  const [taskName, setTaskName] = useState(task.name);
  const [editingName, setEditingName] = useState(false);

  const [category, setCategory] = useState("");
  const [repeating, setRepeating] = useState(false);

  function handleUpdateCategory(event) {
    setCategory(event.target.value);
    // TODO push category onto an array in the DB task
  }

  function handleUpdateRepeating(event) {
    console.log(repeating);
    setRepeating(!repeating);
    console.log(repeating);
  }

  function handleEditChange() {
    setEditingTask(!editingTask);
  }

  async function handleSaveChanges(event) {
    // TODO setters for every UI input in here
    // hook up to appropriate BE Fx's
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
            <div className="flex">
              <img
                onClick={handleEditChange}
                src="/Buttons/exit.svg"
                className="w-1/12"
              />
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
            </div>
            {/* How long would each instance be? (drop down) */}
            {/* Category (fill in the blank or dropdown) */}
            <div className="flex">
              <h3>Category</h3>
              {/* a drop down of user categories and an option to create a new one */}
              <input
                type="text"
                name="category"
                placeholder="Ex: Self Care"
                value={category}
                onChange={handleUpdateCategory}
                className="userInput"
              ></input>
            </div>
            {/* Stay in list before desired rhythm recurs? (boolean) */}
            {/* Repeating? (boolean, hover effect) */}
            <div className="gap-2">
              <div className="flex">
                <h3>Repeating</h3>
                <input
                  type="checkbox"
                  name="Repeating"
                  value={repeating}
                  placeholder="false"
                  onChange={handleUpdateRepeating}
                  className="bg-black w-fit rounded-md border-slate-800 border-2"
                ></input>
              </div>
              {repeating ? <EditFrequency /> : null}
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
          </legend>
        </fieldset>
      </div>
    </>
  );
}
