import { useState, useContext } from "react";

import EditList from "./EditList";
import { EditActivity } from "./EditActivity";
import { ListsContext } from "../Contexts/ListsContext";
// TODO: Edit Activity should be activated when the button is activated next to an activity, not passively

export function List(props) {
  const { id } = props;
  const [editing, setEditing] = useState(false);
  const { lists, setLists } = useContext(ListsContext);
  const list = lists.filter((list) => {
    return list.id === id;
  })[0];

  if (list.length === 0) {
    return console.warn("List with id does not exist");
  }
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
        {editing && (
          <EditList id={list.id} editing={editing} setEditing={setEditing} />
        )}
        {!editing && (
          <button className="editBtn" onClick={handleChange}>
            Edit
          </button>
        )}
        {/* <EditActivity listName={list.name} /> */}
      </div>
    </div>
  );
}
