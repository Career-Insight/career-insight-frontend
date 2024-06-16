import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

const Rechart1 = ({ selectedSkillTrackvalue }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const skillTrackApiCalling = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/dashboard/jobs/skill/${selectedSkillTrackvalue}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );
        const resultArray = Object.entries(data).map(([key, value]) => {
          return { name: key.split(" ").slice(0, 1), uv: value.count };
        });
        setData(resultArray);
      } catch (error) {
        console.log("error", error);
      }
    };
    skillTrackApiCalling();
  }, [selectedSkillTrackvalue]);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data.slice(0, 10)}
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
          interval={0} // Show all labels
          angle={-20} // Rotate labels if they are long
          // textAnchor="end" // Anchor text to the end of the tick
        />
        <YAxis
          tick={{ fill: "#1C1C1C66", fontSize: "15", fontWeight: "bold" }}
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
};

export default Rechart1;
