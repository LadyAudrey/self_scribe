import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";

import { List } from "./List";
import AddList from "./AddList";
import { Kudos } from "./Kudos";

export function DisplayLists() {
  const { lists, setLists } = useContext(ListsContext);
  const [addingList, setAddingList] = useState(false);

  async function handleChange(event) {
    function handleSubmit(event) {
      event.preventDefault();
      console.log(listName);
      // Todo connect new list creation to backend
    }

    await fetch("http://localhost:3001/listItems", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newList),
    });
  }

  return (
    <div className="flex gap-10 w-screen">
      <fieldset className="side">
        <legend className="text-2xl">TDL</legend>
        <div>
          {!lists && <h2>data pending</h2>}
          {lists.length &&
            lists.map((list) => {
              return <List key={uuidv4()} list={list} />;
            })}
        </div>
        {addingList ? (
          <AddList
            lists={lists}
            setLists={setLists}
            addingList={addingList}
            setAddingList={setAddingList}
          />
        ) : (
          <button
            onClick={() => {
              setAddingList(!addingList);
            }}
            className="bg-black p-3 my-5 rounded-lg border-solid border-yellow-400 border-2"
          >
            Add List
          </button>
        )}
        {/* <div className="flex">
            <p>View My Lists</p>
            <button>Boolean with list symbol</button>
          </div> */}
      </fieldset>
      <div>
        <Kudos />
      </div>
    </div>
  );
}
