import { useEffect, useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import { SymptomsContext } from "../../Contexts/Symptoms";

import { SymptomBank } from "./SymptomBank";
import { TodaysSymptoms } from "./TodaysSymptoms";

export function Symptoms() {
  return (
    <div className="flex justify-around w-screen gap-4">
      <div className="side">
        <SymptomBank />
      </div>
      <div className="side">
        <TodaysSymptoms />
      </div>
    </div>
  );
}
