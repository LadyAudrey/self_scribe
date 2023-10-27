export function TDL(props) {
  const { data } = props;
  return (
    <fieldset>
      {/* create css class for legend styling */}
      <legend>TDL</legend>
      {data.map((task, index) => (
        <div key={index}>
          <label>
            {/* For next week- creat oncheck listener */}
            <input type="checkbox" />
            {task}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

// read up on key for understanding TDL
