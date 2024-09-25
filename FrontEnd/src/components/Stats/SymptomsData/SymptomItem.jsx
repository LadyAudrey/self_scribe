import { VisibleBtn } from "../../UI_Pieces/VisibleBtn";

export function SymptomItem(props) {
  const { symptom } = props;
  console.log(symptom);
  return (
    <div>
      <h3>{symptom.name}</h3>
    </div>
  );
}
