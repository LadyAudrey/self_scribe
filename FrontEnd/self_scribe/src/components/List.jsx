import { useState, useContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import EditList from "./EditList";
import { EditActivity } from "./EditActivity";
import { AddTask } from "./AddTask";
import { ListsContext } from "../Contexts/ListsContext";
import { TasksContext } from "../Contexts/ActivitiesContext";
// TODO: Edit Activity should be activated when the button is activated next to an activity, not passively

export function List(props) {
  const { list } = props;
  console.log(list.id);
  const { tasks, setTasks } = useContext(TasksContext);
  const [editing, setEditing] = useState(false);

  const handleChange = () => {
    setEditing(!editing);
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
            id={list.id}
            editing={editing}
            setEditing={setEditing}
            key={uuidv4()}
          />
        )}
        {!editing && (
          <button className="editBtn" onClick={handleChange} key={uuidv4()}>
            Edit
          </button>
        )}
        {/* <EditActivity listName={list.name} /> */}
        <AddTask listId={list.id} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}
