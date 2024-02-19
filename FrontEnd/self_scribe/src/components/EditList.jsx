// EditString not updating UI- de-nesting some of the logic and

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

  const [active, setActive] = useState(list.active);
  const [listName, setListName] = useState(list.name);

  // to close the editing card
  function handleEditChange(event) {
    setEditing(!editing);
  }

  function handleAddActivityChg() {
    setAddActivity(!addActivity);
  }

  async function handlePause(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/pauseList/${list.id}`, {
      method: "POST",
    });
    if (response.ok) {
      setActive(!active);
    }
    console.log(active);
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
          <img
            onClick={handleEditChange}
            src="/Buttons/exit.svg"
            className="w-1/12"
          />
          {!editingName && (
            <div
              onDoubleClick={() => {
                setEditingName(true);
              }}
            >
              {listName}
            </div>
          )}
          {editingName && (
            <EditString
              setEditingName={setEditingName}
              id={id}
              listName={listName}
              setListName={setListName}
            />
          )}
          <div className="flex flex-row gap-2 justify-around text-yellow-200">
            <input
              type="checkbox"
              id="active"
              value={active}
              className=""
              onChange={handlePause}
            />
            <label htmlFor="active">Pause</label>
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
