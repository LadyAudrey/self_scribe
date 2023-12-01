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
  const [list, setList] = useState({});
  const [completed, setCompleted] = useState({});
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
    // loop through list
    const updatedTasks = list.todos.map((task) => {
      if (task.name === event.target.name) {
        return {
          name: task.name,
          completed: event.target.checked,
        };
      }
      return task;
    });
    // created new list with updated todos

    const newList = {
      title: list.title,
      todos: updatedTasks,
    };
    setList(newList);
    // sending stuff to backend
    // TODO look up fetch api on mdn- called a "request object"
    await fetch("http://localhost:3001/listItems", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newList),
    });
  }
  // inside handleChange figure out the index of the array that contains the name == to event.target.name and update checkbox[index].completed = event.target.value
  // call set list with updated value
  return (
    <fieldset>
      <legend className="text-2xl">{list.title}</legend>
      {list?.todos &&
        list.todos.map((task, index) => (
          <div key={index}>
            <label htmlFor={task.name}>{task.name}</label>
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
  );
}
