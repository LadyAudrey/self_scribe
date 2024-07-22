import { useState, useContext } from "react";

import { ListsContext } from "../../Contexts/ListsContext";

export function EditList(props) {
  const { id, editing, setEditing } = props;
  const { lists, setLists } = useContext(ListsContext);
  const [editingName, setEditingName] = useState(false);

  const list = lists.filter((list) => {
    return list.id === id;
  })[0];

  const [active, setActive] = useState(list.active);
  const [listName, setListName] = useState(list.name);

  // to close the editing card
  function handleEditChange() {
    setEditing(!editing);
  }

  async function handlePause(event) {
    event.preventDefault();
    const response = await fetch(`/lists/pause/${list.id}`, {
      method: "POST",
    });
    if (response.ok) {
      setActive(!active);
    }
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
    const response = await fetch(`/lists/delete/${list.id}`, {
      method: "POST",
    });
    if (response.ok) {
      removeFromList();
    }
  }

  return (
    <>
      <div>
        {/* needs background to be correct gradient */}
        <div className="absolute top-0 z-50 flex flex-col card">
          <div className="flex gap-4">
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
                className="text-3xl"
              >
                {listName}
              </div>
            )}
            {editingName && (
              <div>
                <input
                  autoFocus
                  value={listName}
                  className="bg-black text-3xl"
                  onChange={(event) => {
                    setListName(event.target.value);
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2 justify-around text-yellow-200">
            <button className="editBtns" onClick={handlePause}>
              Pause
            </button>
            <button className="editBtns" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
