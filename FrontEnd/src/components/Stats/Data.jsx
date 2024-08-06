import { useContext } from "react";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { TaskSet } from "./TaskSet";
import { SymptomSet } from "./SymptomSet";

export function Data() {

  const { symptoms } = useContext(SymptomsContext);
  return (
    <div>
      <TaskSet />
      <SymptomSet symptoms={symptoms} />
    </div>
  );
}
