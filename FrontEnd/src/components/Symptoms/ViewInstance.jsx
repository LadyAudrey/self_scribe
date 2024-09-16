import { useContext } from "react";

import { SymptomHistoryContext } from "../../Contexts/SymptomsHistoryContext";

export function ViewInstance(props) {
  const { created_on, id, intensity, notes } = props.instance;
  console.log(props.instance);
  const { symptomsHistory, setSymptomsHistory } = useContext(
    SymptomHistoryContext
  );

  const createdOn = new Date(created_on);

  async function deleteInstance() {
    event.preventDefault();
    try {
      const response = await fetch(`/symptoms/history/delete/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        const newInstancesHistory = symptomsHistory.filter((element) => {
          return id !== element.id;
        });
        setSymptomsHistory(newInstancesHistory);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <tbody>
        <tr className="w-max">
          <td className="px-5">{createdOn.toDateString()}</td>
          <td className="px-5">{intensity}</td>
          <td className="px-5">
            {
              <img
                onClick={deleteInstance}
                src="/Buttons/delete.svg"
                className="w-8"
              />
            }
          </td>
        </tr>
        <tr className="w-max border-b-2 border-slate-500">
          <td className="ps-5 italic">{notes}</td>
        </tr>
      </tbody>
    </>
  );
}
