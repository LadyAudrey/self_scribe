import { useState } from "react";
import EditList from "./EditList";

export function List(props) {
  const { list, state } = props;
  const [editing, setEditing] = useState(false);
  const handleChange = () => {
    setEditing(!editing);
    console.log(editing);
    console.log("editing is being activated");
  };

  return (
    <div>
      <div className="flex gap-2 relative">
        <p className="legend title">{list.name}</p>
        {list?.todos &&
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
          ))}
        {editing ? (
          <EditList
            state={state}
            list={list}
            editing={editing}
            setEditing={setEditing}
          />
        ) : (
          <button className="editBtn" onClick={handleChange}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
