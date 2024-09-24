import { useContext, useState } from "react";

import { TaskSet } from "./TasksData/TasksSet";
import { SymptomSet } from "./SymptomsData/SymptomSet";
export function Data() {
  return (
    <div>
      <h2>All your data</h2>
      <TaskSet />
      <SymptomSet />
    </div>
  );
}
