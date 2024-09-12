export function ViewInstance(props) {
  const { created_on, intensity, notes } = props.instance;
  const createdOn = new Date(created_on);
  return (
    <div className="flex w-max">
      <p>{createdOn.toDateString()}</p>
      <p>{intensity}</p>
      <p>{notes}</p>
    </div>
  );
}
