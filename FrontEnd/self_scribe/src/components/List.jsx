import { useState, useContext } from "react";

import { ListsData } from "../Contexts/ListsData";

import EditList from "./EditList";
import { EditActivity } from "./EditActivity";
// TODO: Edit Activity should be activated when the button is activated next to an activity, not passively

export function List(props) {
  const { list, setList } = props;
  const [editing, setEditing] = useState(false);
  const { lists, setLists } = useContext(ListsData);

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
          <EditList
            // lists={lists}
            // setLists={setLists}
            list={list}
            editing={editing}
            setEditing={setEditing}
          />
        )}
        {!editing && (
          <button className="editBtn" onClick={handleChange}>
            Edit
          </button>
        )}
        <EditActivity listName={list.name} />
      </div>
    </div>
  );
}
