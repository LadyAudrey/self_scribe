import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { AddTask } from "../Tasks/AddTask";
import EditList from "./EditList";
import { Tasks } from "../Tasks/Tasks";

export function List(props) {
  const { list } = props;
  const [seeTasks, setSeeTasks] = useState(true);
  const [editing, setEditing] = useState(false);
  const [listCompleted, setListCompleted] = useState(false);

  const handleVisibility = () => {
    setSeeTasks(!seeTasks);
  };
  const handleChange = () => {
    setEditing(!editing);
  };

  return (
    <div className="flex flex-col gap-2 my-2 relative">
      <div className="flex gap-5">
        <button
          className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
          onClick={handleVisibility}
        ></button>
        <h3 className="title">{list.name}</h3>
        {/* TODO: hook up Fxs */}
        <input
          name={list.checked}
          type="checkbox"
          onChange={() => {
            setListCompleted(!listCompleted);
          }}
          className="m-2"
          checked={list.checked}
        />
        {editing && (
          <EditList
            id={list.id}
            editing={editing}
            setEditing={setEditing}
            key={uuidv4()}
          />
        )}
        {!editing && (
          <button
            className="h-6 w-6  bg-cover pencil bg-[url('/Buttons/Edit.svg')]"
            onClick={handleChange}
            key={uuidv4()}
          ></button>
        )}
        <AddTask listId={list.id} />
      </div>
      {seeTasks && <Tasks listId={list.id} />}
    </div>
  );
}
