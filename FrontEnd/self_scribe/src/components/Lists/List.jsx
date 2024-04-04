import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { AddTask } from "../Tasks/AddTask";
import EditList from "./EditList";
import { Tasks } from "../Tasks/Tasks";

// TODO: Edit Activity should be activated when the button is activated next to an activity, not passively

export function List(props) {
  const { list } = props;
  const [seeTasks, setSeeTasks] = useState(true);
  const [editing, setEditing] = useState(false);
  // Want this to be true when all of the tasks are completed, or the user clicks this and that turns all of the tasks to completed, update DB as needed
  const [listCompleted, setListCompleted] = useState(false);

  const handleChange = () => {
    setEditing(!editing);
  };

  const handleVisibility = () => {
    setSeeTasks(!seeTasks);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 my-2 relative">
        {/* contains collapse button, name (done), boolean for completion, Edit List(done), Add Task(done) buttons */}
        <div className="flex gap-5">
          <button
            className="h-6 w-6 bg-cover bg-[url('/Buttons/viewLists.svg')]"
            onClick={handleVisibility}
          ></button>
          <h3 className="legend title">{list.name}</h3>
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
        {/* {list?.todos &&
          list.todos.map((task) => (
            <div>
              <label htmlFor={task.name} className="legend-name">
                {task.name}
              </label>
              <input
                id={task.name}
                name={task.name}
                type="checkbox"
                onChange={() => {
                  console.log("clicked onChange");
                }}
                className="m-2"
                checked={task.completed}
              />
              <button>Delete</button>
            </div>
          ))} */}
        {seeTasks && <Tasks listId={list.id} />}
      </div>
    </div>
  );
}
