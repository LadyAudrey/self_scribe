import { useState } from "react";

export default function EditString(props) {
  const { list } = props;
  const [editingName, setEditingName] = useState(false);
  const [listName, setListName] = useState(list.name);

  function handleOpenNameChange() {
    setEditingName(!editingName);
  }

  function handleNameChange() {
    // TODO: update to change the list name in the DB
    console.log("handleNameChanging");
  }
  return (
    <>
      {/* <h3>I'm a name that you can update</h3> */}
      <div>
        {!editingName && (
          <div onDoubleClick={handleOpenNameChange}>{list.name}</div>
        )}
        {editingName && (
          <input
            autoFocus
            value={listName}
            className="bg-black"
            onChange={(event) => {
              setListName(event.target.value);
            }}
            onBlur={handleNameChange}
          ></input>
        )}
      </div>
    </>
  );
}
