import { useState, useContext } from "react";

import { GraphItemsContext } from "../../Contexts/GraphingItemsContext";

import { Data } from "./Data";
import { Graphs } from "./Graphs";

const mockTaskHistory = [
  {
    id: 4444,
    task_id: 43,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4444,
    task_id: 43,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4444,
    task_id: 45,
    created_on: "2024-04-18 09:04:37.943502",
    completed: false,
    notes: "details",
  },
  {
    id: 4445,
    task_id: 45,
    created_on: "2024-04-19 09:04:59.282867",
    completed: false,
    notes: "more details",
  },
  {
    id: 4446,
    task_id: 45,
    created_on: "2024-04-19 09:04:59.282867",
    completed: false,
    notes: "some more details",
  },
];

export function Stats() {
  const [graphingItems, setGraphingItems] = useState(mockTaskHistory);
  return (
    <GraphItemsContext.Provider value={{ graphingItems, setGraphingItems }}>
      <div className="page">
        <div className="side">
          <Data />
        </div>
        <div className="side">
          <Graphs />
        </div>
      </div>
    </GraphItemsContext.Provider>
  );
}
