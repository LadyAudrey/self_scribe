import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { ListsContext } from "../../../Contexts/ListsContext";
import { TasksContext } from "../../../Contexts/TasksContext";
import { GraphItemsContext } from "../../../Contexts/GraphingItemsContext";

import { TasksData } from "./TasksData";
import { VisibleBtn } from "../../UI_Pieces/VisibleBtn";

export function TaskSet() {
  const { lists } = useContext(ListsContext);
  const { tasks } = useContext(TasksContext);
  const { graphingItems, setGraphingItems } = useContext(GraphItemsContext);
  const [seeTasks, setSeeTasks] = useState(true);

  return (
    <>
      {lists.map((list) => {
        return (
          <div key={uuidv4()}>
            <div className="flex gap-3">
              <VisibleBtn visible={seeTasks} setVisible={setSeeTasks} />
              <h3>{list.name}</h3>
            </div>
            {!seeTasks && <div></div>}
            {seeTasks && <TasksData list={list} key={uuidv4()} />}
          </div>
        );
      })}
    </>
  );
}
