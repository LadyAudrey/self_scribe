import { Data } from "./Data";
import { Graphs } from "./Graphs";
export function Stats() {
  return (
    <div className="page">
      <div className="side">
        <Data />
      </div>
      <div className="side">
        <Graphs />
      </div>
    </div>
  );
}
