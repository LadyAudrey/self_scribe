import { useState, useContext } from "react";
// import { EditActivity } from "./EditActivity";

import { ListsContext } from "../Contexts/ListsContext";
import EditString from "./EditString";

// TODO remove the prop drilling and update with useContext();

export default function EditList(props) {
  const { id, editing, setEditing } = props;
  const { lists, setLists } = useContext(ListsContext);
  const [addActivity, setAddActivity] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const list = lists.filter((list) => {
    return list.id === id;
  })[0];

  // to close the editing card
  function handleEditChange() {
    setEditing(!editing);
    console.log("I'm editing", editing);
  }

  // to open the editActivity card
  // currently getting an error of setAddActivity is not a function... why???
  function handleAddActivityChg() {
    console.log(addActivity);
    setAddActivity(!addActivity);
  }

  function removeFromList() {
    const newList = lists.filter((element) => {
      return element.id !== list.id;
    });
    setLists(newList);
    handleEditChange();
  }

  async function handleDelete(event) {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:3001/deleteList/${list.id}`,
      { method: "POST" }
    );
    if (response.ok) {
      removeFromList();
    }
  }

  return (
    <>
      <div>
        {/* needs background to be correct gradient */}
        <div className="absolute top-0 z-50 flex flex-col card border-slate-400">
          <div>
            {/* swap for an X svg */}
            <img onClick={handleEditChange} src="/Buttons/Complete.svg" />
          </div>
          {!editingName && (
            <div
              onDoubleClick={() => {
                setEditingName(true);
              }}
            >
              {list.name}
            </div>
          )}
          {editingName && (
            <EditString setEditingName={setEditingName} id={id} />
          )}
          <div className="flex flex-row gap-2 justify-around text-yellow-200">
            <button className="mainBtns border-emerald-800">Pause</button>
            <button
              className="mainBtns border-emerald-800"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
