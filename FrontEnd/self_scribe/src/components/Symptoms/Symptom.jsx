import { v4 as uuidv4 } from "uuid";

export function Symptom(props) {
  return (
    <div className="flex gap-2">
      <h4>{props.symptom.name}</h4>
      <select
        name="intensity"
        onChange={(event) => {
          onChangeIntensity(event, props.symptom.id);
        }}
        defaultValue={0}
        className="block w-fit p-2 mb-6 text-sm text-white border border-yellow-300 rounded-lg bg-yellow-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-900 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {/* TDL fill in up to 9 */}
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
    </div>
  );
}
