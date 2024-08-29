import { useContext } from "react";
import { TaskHistoryContext } from "../../Contexts/TaskHistoryContext";

import { ExitBtn } from "../UI_Pieces/ExitBtn";

export function TaskHistory(props) {
  const { seeHistory, setSeeHistory, task } = props;
  const { taskHistory, setTaskHistory } = useContext(TaskHistoryContext);

  //   I don't think I'm getting the right thing out of the fetch atm
  setTaskHistory(getTaskHistory(task.id));
  async function getTaskHistory() {
    const response = await fetch(`/task-history/read/${task.id}`);
    console.log(response);
    const result = await response.json();
    return result;
  }

  return (
    <>
      <div className="flex justify-between">
        <h3>{task.name}</h3>
        <ExitBtn setterFx={setSeeHistory} />
      </div>
      <div></div>
    </>
  );
}
