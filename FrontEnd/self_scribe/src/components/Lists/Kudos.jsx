import { useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../Contexts/ListsContext";
import { TasksContext } from "../../Contexts/TasksContext";

import { Kudo } from "../Tasks/Kudo";

export function Kudos() {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  const [seeKudos, setSeeKudos] = useState(true);

  const handleVisibility = () => {
    setSeeKudos(!seeKudos);
  };

  return (
    <div className="">
      <div className="title text-2xl">Kudos!</div>
      {lists.map((list) => {
        const filteredTasks = tasks.filter((task) => {
          return task.list_id === list.id && task.completed;
        });
        if (filteredTasks.length === 0) {
          return <div key={uuidv4()}></div>;
        }
        return (
          <div className="card_data" key={uuidv4()}>
            <div className="flex gap-5">
              {/* why isn't the button rendering??? */}
              <button className="visible" onClick={handleVisibility}></button>
              <h3 className="title">{list.name}</h3>
              {/* TODO: hook up Fxs */}
              <input
                name={list.checked}
                type="checkbox"
                // onChange={() => {
                //   setListCompleted(!listCompleted);
                // }}
                className="m-2"
                checked={list.checked}
              />
            </div>
            {/* {seeTasks && <Tasks listId={list.id} />} */}
            <div className="">
              {filteredTasks.map((task) => {
                return <Kudo key={uuidv4()} taskId={task.id} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  // <>
  //   <div className="side">
  //     <div className="title text-2xl">Kudos!</div>
  //     {tasks
  //       .filter((task) => {
  //         return task.completed;
  //       })
  //       .map((task) => (
  //         <Kudo taskId={task.id} key={uuidv4()} />
  //       ))}
  //   </div>
  // </>
}
