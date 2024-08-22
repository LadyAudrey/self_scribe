import { useContext } from "react";
import { useState } from "react";

import { ListsContext } from "../../Contexts/ListsContext";

export default function AddList(props) {
  const { addingList, setAddingList } = props;
  const { lists, setLists } = useContext(ListsContext);
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");

  function handleAddListChange(event) {
    setListName(event.target.value);
  }

  function handleAddListDescription(event) {
    setDescription(event.target.value);
  }

  async function handleAddListSubmit(event) {
    // TODO create state for description
    event.preventDefault();
    setAddingList(!addingList);
    const user = "audrey";
    const response = await fetch(`/lists/add/${user}/${listName}`, {
      method: "POST",
      body: JSON.stringify({
        description: description || "placeholder description",
      }), //  accept description in UI
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const id = await response.json();
      const newList = {
        competed: false,
        created_on: Date.now().toString(),
        description: description || "placeholder description",
        id,
        last_updated: Date.now().toString(),
        name: listName,
        repeats: false,
        user_name: "audrey",
      };
      setLists([...lists, newList]);
    }
  }
  return (
    <>
      <div className="flex flex-col card border-slate-400">
        <img
          onClick={() => {
            setAddingList(!addingList);
          }}
          src="/Buttons/exit.svg"
          className="w-1/12"
        />
        <form
          onSubmit={handleAddListSubmit}
          className="self-end flex flex-col gap-5"
        >
          <label className="flex flex-col">
            List Name
            <input
              type="text"
              name="newList"
              placeholder="New List Name"
              value={listName}
              onChange={handleAddListChange}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <label className="flex flex-col">
            List Description
            <input
              type="text"
              name="newListDescription"
              placeholder="Description"
              value={description}
              onChange={handleAddListDescription}
              className="bg-black rounded-md mx-2 border-slate-800 border-2"
            ></input>
          </label>
          <button type="submit">Add List</button>
        </form>
      </div>
    </>
  );
}
