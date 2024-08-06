import { useState } from "react";

import { Data } from "./Data";
import { Graphs } from "./Graphs";
export function Stats() {
  const [graphingItems, setGraphingItems] = useState([]);
  return (
    <div className="page">
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
  );
}
