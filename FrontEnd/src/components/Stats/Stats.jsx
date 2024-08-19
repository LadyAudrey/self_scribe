import { useState, useContext } from "react";

import { Data } from "./Data";
import { Graphs } from "./Graphs";

export function Stats() {
  const [graphingItems, setGraphingItems] = useState([]);
  return (
    <TaskHistoryContext.Provider>
      <div className="page" value={{ graphingItems, setGraphingItems }}>
        <div className="side">
          <Data
            graphingItems={graphingItems}
            setGraphingItems={setGraphingItems}
          />
        </div>
        <div className="side">
          <Graphs
            graphingItems={graphingItems}
            setGraphingItems={setGraphingItems}
          />
        </div>
      </div>
    </TaskHistoryContext.Provider>
  );
}
