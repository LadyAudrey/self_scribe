export function Kudos(props) {
  const { data } = props;
  return (
    <ol>
      {data.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ol>
  );
}
