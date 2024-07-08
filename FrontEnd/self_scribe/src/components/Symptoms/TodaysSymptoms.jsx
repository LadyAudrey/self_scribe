import { useContext } from "react";

import { SymptomsContext } from "../../Contexts/Symptoms";

export function TodaysSymptoms() {
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  return (
    <div className="side">
      <div className="text-2xl">Todays' Symptoms</div>
      <div className="card_data"></div>
    </div>
  );
}
