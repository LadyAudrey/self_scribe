import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { EditList } from "./EditList";
import { AddTask } from "../Tasks/AddTask";
import { VisibleBtn } from "../UI_Pieces/VisibleBtn";
import { EditBtn } from "../UI_Pieces/EditBtn";

import { Tasks } from "../Tasks/Tasks";

export function List(props) {
  const { list } = props;
  const [visible, setVisible] = useState(true);
  const [editing, setEditing] = useState(false);
  const [listCompleted, setListCompleted] = useState(false);

  return (
    <div className="card_data">
      <div className="flex flex-wrap w-1/2 gap-5">
        <VisibleBtn setVisible={setVisible} visible={visible} />
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
        {!editing && <EditBtn setEditing={setEditing} editing={editing} />}
        <AddTask listId={list.id} />
      </div>
      {visible && <Tasks listId={list.id} />}
    </div>
  );
}
