import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Custom Rectangle Component for Background
const CustomBackground = (props) => {
  const { fill, x, y, width, height, radius } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius}
      ry={radius}
    />
  );
};

const data = [
  { name: "A", uv: 3000 },
  { name: "B", uv: 3000 },
  { name: "C", uv: 2000 },
  { name: "D", uv: 2000 },
  { name: "E", uv: 2000 },
  { name: "F", uv: 2000 },
  { name: "G", uv: 2000 },
  { name: "H", uv: 2000 },
  { name: "J", uv: 2000 },
];

export default class Rechart1 extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/bar-chart-has-background-32n2fm";

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barSize={20} // Custom bar width
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(50, 62, 251, 0.38)" />
              <stop offset="75%" stopColor="rgba(50, 62, 251, 0.94)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#1C1C1C66", fontSize: "15" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#1C1C1C66", fontSize: "15" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <Bar
            dataKey="uv"
            fill="url(#colorUv)"
            background={<CustomBackground fill="#eee" radius={8} />}
            radius={[8, 8, 8, 8]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
