import { useState, useContext } from "react";

import { GraphItemsContext } from "../../Contexts/GraphingItemsContext";

import { Data } from "./Data";
import { Graphs } from "./Graphs";

export function Stats() {
  const [graphingItems, setGraphingItems] = useState([]);
  return (
    <GraphItemsContext.Provider value={{ graphItems, setGraphItems }}>
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
    </GraphItemsContext.Provider>
  );
}
