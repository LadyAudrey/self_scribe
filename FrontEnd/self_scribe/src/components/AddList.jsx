import { useState } from "react";

export default function AddList() {
  const [listName, setListName] = useState("");

  function handleAddListChange(event) {
    setListName(event.target.value);
  }

  function handleAddListSubmit(event) {
    event.preventDefault();
    console.log(listName);
    const user = "audrey";
    fetch(`http://localhost:3001/addList/${user}/${listName}`, {
      method: "POST",
    });
    // TODO have the button refresh the page when updating lists
  }
  return (
    <form onSubmit={handleAddListSubmit} className="self-end">
      <button type="submit">Add List</button>
      <label>
        List Name:
        <input
          type="text"
          name="newList"
          value={listName}
          onChange={handleAddListChange}
        ></input>
      </label>
    </form>
  );
}
