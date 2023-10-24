// use the next fetch in a server component

const testing = ["a", "b", "c"];

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
