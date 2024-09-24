import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const mockData = [
  { name: "testing", amount: 400 },
  { name: "test", amount: 200 },
  { name: "testing", amount: 500 },
  { name: "testing", amount: 800 },
];

export function Graphs() {
  return (
    <LineChart width={400} height={400} data={mockData}>
      <Line type="monotone" dataKey={"amount"} stroke="#8884d8" />
      <CartesianGrid stroke={"#CCC"} />
      <XAxis dataKey={"name"} />
      <YAxis />
    </LineChart>
  );
}
