import { useContext } from "react";

import { TasksContext } from "../../Contexts/TasksContext";
import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { TaskSet } from "./TaskSet";
import { SymptomSet } from "./SymptomSet";

export function Data() {
  const { tasks } = useContext(TasksContext);
  const { symptoms } = useContext(SymptomsContext);
  return (
    <div>
      <TaskSet tasks={tasks} />
      <SymptomSet symptoms={symptoms} />
    </div>
  );
}
