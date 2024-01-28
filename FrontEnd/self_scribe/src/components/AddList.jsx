import { useState } from "react";

export default function AddList(props) {
  const { lists, setLists } = props;
  const [listName, setListName] = useState("");

  function handleAddListChange(event) {
    setListName(event.target.value);
  }

  async function handleAddListSubmit(event) {
    event.preventDefault();
    console.log(listName);
    const user = "audrey";
    const response = await fetch(
      `http://localhost:3001/addList/${user}/${listName}`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setLists([...lists, result.rows[0]]);
    }
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
          className="bg-black rounded-md mx-2 border-slate-800 border-2"
        ></input>
      </label>
    </form>
  );
}
