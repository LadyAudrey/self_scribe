import { useContext, useState } from "react";

import { TaskSet } from "./TaskSet";
import { SymptomSet } from "./SymptomSet";

export function Data(props) {
  const { graphingItems, setGraphingItems } = props;
  return (
    <div>
      <TaskSet
        graphingItems={graphingItems}
        setGraphingItems={setGraphingItems}
      />
      <SymptomSet
        graphingItems={graphingItems}
        setGraphingItems={setGraphingItems}
      />
    </div>
  );
}
