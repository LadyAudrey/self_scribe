import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Symptoms } from "./SymptomsPg";

export function SymptomsList(props) {
  const { symptoms } = props;
  const [seeSymptoms, setSeeSymptoms] = useState(false);

  const handleVisibility = () => {
    setSeeSymptoms(!seeSymptoms);
  };
  return <div>SymptomsList</div>;
}
