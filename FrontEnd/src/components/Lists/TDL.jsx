import { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";

import { List } from "./List";
import AddList from "./AddList";

export function TDL() {
  const { lists, setLists } = useContext(ListsContext);
  const [addingList, setAddingList] = useState(false);

  return (
    <>
      <div className="text-2xl">To Do List</div>
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
          className="addBtns"
        >
          Add List
        </button>
      )}
    </>
  );
}
