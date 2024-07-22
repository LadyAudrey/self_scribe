import { TDL } from "./TDL";
import { Kudos } from "./Kudos";

export function DisplayLists() {
  return (
    <div className="page">
      <div className="side">
        <TDL />
      </div>
      <div className="side">
        <Kudos />
      </div>
    </div>
  );
}
