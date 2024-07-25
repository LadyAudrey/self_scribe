import { useContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/SymptomsContext";

import { VisibleBtn } from "../UI_Pieces/VisibleBtn";

export function TodaysSymptoms() {
  const { symptoms, setSymptoms } = useContext(SymptomsContext);
  const [seeDaySymptoms, setSeeDaySymptoms] = useState(true);
  const handleVisibility = () => {
    setSeeDaySymptoms(!seeDaySymptoms);
  };

  return (
    <div>
      <div className="text-2xl">Todays' Symptoms</div>
      <div className="card_data"></div>
    </div>
  );
}
