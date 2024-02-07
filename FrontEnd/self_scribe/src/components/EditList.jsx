import { useState, useContext } from "react";
// import { EditActivity } from "./EditActivity";

import { ListsData } from "../Contexts/ListsData";
import EditString from "./EditString";

export default function EditList(props) {
  const { list, editing, setEditing } = props;
  const { lists, setLists } = useContext(ListsData);
  console.log(lists);
  const [addActivity, setAddActivity] = useState(false);
  const [editingName, setEditingName] = useState(false);

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
    const newList = allLists.lists.filter((element) => {
      return element.id !== list.id;
    });
    allLists.setLists(newList);
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
        <div className="absolute top-0 z-50 flex flex-col card bg-slate-700 border-slate-400">
          <div>
            <img
              onClick={handleEditChange}
              src="/FrontEnd/self_scribe/src/Buttons/Complete.svg"
            />
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
            <EditString
              setEditingName={setEditingName}
              list={list}
              // lists={lists}
              // setLists={setLists}
            />
          )}
        </div>
        <div className="flex flex-row gap-2 justify-around text-yellow-200">
          <button className="bg-slate-900 p-2">Pause</button>
          <button className="bg-slate-900 p-2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
