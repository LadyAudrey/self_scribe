import { useEffect, useState } from "react";

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
      <div>
        <fieldset className="card">
          <legend className="legend-title">ToDos</legend>
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
                    className="m-2"
                    checked={task.completed}
                  />
                  <button>Edit</button>
                  <button>X</button>
                </div>
              ) : null
            )}
        </fieldset>
      </div>
      <div>
        <fieldset className="card">
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
