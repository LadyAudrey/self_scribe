import { useEffect, useState } from "react";

import { List } from "./List";
import { ListsData } from "../Contexts/ListsData";
import AddList from "./AddList";

const kudos = [];

export function DisplayLists() {
  //
  const [lists, setLists] = useState([]);
  // Kenson approved use of useEffect
  useEffect(() => {
    fetchTDL();
  }, []);

  async function fetchTDL() {
    const response = await fetch("http://localhost:3001/getLists/audrey");
    const result = await response.json();
    setLists(result.lists);
    console.log(result);
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

    // const newList = {
    //   title: list.title,
    //   todos: updatedTasks,
    // };
    // setList(newList);

    await fetch("http://localhost:3001/listItems", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newList),
    });
  }

  return (
    <>
      <ListsData.Provider value={{ lists, setLists }}>
        <div className="relative flex justify-around">
          {/* TODO why isn't gap working here??? */}
          <div className="flex flex-col gap-10">
            <fieldset>
              <legend className="text-2xl">TDL</legend>
              <div>
                {!lists && <h2>data pending</h2>}
                {lists.length &&
                  lists.map((list, index) => {
                    return (
                      <List
                        list={list}
                        key={index}
                        // lists={lists}
                        setLists={setLists}
                      />
                    );
                  })}
              </div>
              {/* TODO create update, pop editing into seperate components */}
              <AddList
                lists={lists}
                setLists={setLists}
                className="absolute bottom-0"
              />
              <div className="flex">
                <p>View My Lists</p>
                {/* TODO update button background to the List svg */}
                <button>Boolean with list symbol</button>
              </div>
            </fieldset>
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
      </ListsData.Provider>
    </>
  );
}
