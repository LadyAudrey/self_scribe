import { SymptomBank } from "./SymptomBank";
import { TodaysSymptoms } from "./TodaysSymptoms";

export function SymptomsPg() {
  // 
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
