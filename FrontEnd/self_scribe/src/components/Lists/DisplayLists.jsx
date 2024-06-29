import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";

import { List } from "./List";
import AddList from "./AddList";
import { TDL } from "./TDL";
import { Kudos } from "./Kudos";

export function DisplayLists() {
  const { lists, setLists } = useContext(ListsContext);
  const [addingList, setAddingList] = useState(false);

  async function handleChange(event) {
    function handleSubmit(event) {
      event.preventDefault();
      // Todo connect new list creation to backend
    }

    await fetch("http://localhost:3001/listItems", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newList),
    });
  }

  return (
    // extract 30-57 into it's own component
    <div className="flex justify-around w-screen gap-4">
      <div className="side">
        <TDL />
      </div>
      <div className="side">
        <Kudos />
      </div>
    </div>
  );
}
