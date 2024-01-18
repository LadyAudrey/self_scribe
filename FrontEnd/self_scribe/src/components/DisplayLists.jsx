import { useEffect, useState } from "react";

import { List } from "./List";

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

const kudos = [];

export function DisplayLists() {
  //
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  function handleAddListChange(event) {
    setListName(event.target.value);
  }

  function handleAddListSubmit(event) {
    event.preventDefault();
    console.log(listName);
    const user = "audrey";
    fetch(`http://localhost:3001/addList/${user}/${listName}`, {
      method: "POST",
    });
    // TODO have the button refresh the page when updating lists
  }

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/getLists/audrey");
    const result = await response.json();
    setLists(result.lists);
    console.log(result.list);
  }
  async function handleChange(event) {
    const updatedTasks = list.todos.map((task) => {
      if (task.name === event.target.name) {
        if (event.target.checked === true) {
          kudos.push(task);
        } else {
          const index = kudos.indexOf(task);
          kudos.splice(index, 1);
        }
        return {
          name: task.name,
          completed: event.target.checked,
        };
      }
      return task;
    });

    function handleSubmit(event) {
      event.preventDefault();
      console.log(listName);
      // Todo connect new list creation to backend
    }

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
    <div className="flex justify-around">
      <div>
        {!lists && <h2>data pending</h2>}
        {lists.length &&
          lists.map((list, index) => {
            return <List list={list} key={index} />;
          })}
        <form onSubmit={handleAddListSubmit}>
          <button type="submit">Add List</button>
          <label>
            List Name:
            <input
              type="text"
              name="newList"
              value={listName}
              onChange={handleAddListChange}
            ></input>
          </label>
        </form>
      </div>
      <div>
        <fieldset>
          <legend className="legend title">Kudos!</legend>
          {kudos.map((task, index) => (
            <div key={index}>
              <label htmlFor={task.name} className="legend-title">
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
          ))}
        </fieldset>
      </div>
    </div>
  );
}
