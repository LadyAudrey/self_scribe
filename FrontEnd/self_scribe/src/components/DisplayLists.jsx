import { useState } from "react";

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

// I want to have lists and then activities within them. I'm wondering if I'll have one more component layer here, but I think this is workable for now

export function DisplayLists(props) {
  const [itemComplete, setItemCompleted] = useState(false);
  const handleChange = (isCompleted) => {
    setItemCompleted(isCompleted);
    console.log(itemComplete);
  };
  // need to figure out why the first index is n't showing up from server.js to make legend text responsive

  const { list } = props;
  console.log(list);
  return (
    <fieldset>
      <legend className="text-2xl">{list.title}</legend>
      {list.todos.map((task, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              onChange={handleChange}
              className="m-2"
              checked={task.completed}
            />
            {task.name}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

// read up on key for understanding TDL
