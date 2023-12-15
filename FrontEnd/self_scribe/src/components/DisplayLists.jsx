import { useEffect, useState } from "react";

import EditActivity from "./EditActivity";
import EditList from "./EditLists";

// Storing values to pass to back end
// client = {
//  "activites": {
//  dates: [values]
// }
// }

// toDoItem = {
// name: string,
// completed: boolean,
// }

// toDoList = {
// title: string,
// toDos: [toDoItem]
// }

export function DisplayLists() {
  //
  const [list, setList] = useState({});
  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  const [editing, setEditing] = useState(false);
  function toggleEditing() {
    setEditing(!editing);
  }

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/listItems");
    const result = await response.json();
    setList(result);
  }
  async function handleChange(event) {
    const updatedTasks = list.todos.map((task) => {
      if (task.name === event.target.name) {
        return {
          name: task.name,
          completed: event.target.checked,
        };
      }
      return task;
    });
    console.log(list);

    const newList = {
      title: list.title,
      todos: updatedTasks,
    };

    setList(newList);
    await fetch("http://localhost:3001/listItems", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newList),
    });
  }
  return (
    <div className="flex flex-row justify-around">
      <div className="relative card">
        <img src="/Buttons/add.svg" className="absolute top-5 right-5" />
        <fieldset>
          <legend className="legend-title">ToDos</legend>
          <div className="flex">
            <h3>{list.title}</h3>
            <button onClick={toggleEditing}>Edit</button>
            {editing ? (
              <EditList listName={list.title} activites={list.todos} />
            ) : null}
            {/* TDL- check if this is working when servers are running again */}
          </div>
          {list?.todos &&
            list.todos.map((task, index) =>
              task.completed === false ? (
                <div key={index}>
                  <label htmlFor={task.name} className="legend-item">
                    {task.name}
                  </label>
                  <input
                    id={task.name}
                    name={task.name}
                    type="checkbox"
                    onChange={handleChange}
                    className="m-5"
                    checked={task.completed}
                  />
                  <button>X</button>
                </div>
              ) : null
            )}
        </fieldset>
      </div>
      <div className="card">
        <fieldset>
          <legend className="legend-title">Kudos!</legend>
          {list?.todos &&
            list.todos.map((task, index) =>
              task.completed ? (
                <div key={index}>
                  <label htmlFor={task.name} className="legend-item">
                    {task.name}
                  </label>
                  <input
                    id={task.name}
                    name={task.name}
                    type="checkbox"
                    onChange={handleChange}
                    className="m-2"
                    checked={task.completed}
                  />
                  <button>Edit</button>
                </div>
              ) : null
            )}
        </fieldset>
      </div>
    </div>
  );
}
