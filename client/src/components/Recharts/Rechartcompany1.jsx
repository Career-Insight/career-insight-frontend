import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
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

const fetchReviews = async () => {
  const { data } = await axios.get(
    `http://localhost:8000/api/v1/review/get-reviews/`,
    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
  );
  return data;
};

const Rechartcompany1 = () => {
  const { data: dataChart = [] } = useQuery("reviews", fetchReviews);
  if (dataChart.length === 0) {
    return (
      <div className="w-100 h-100 flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#323efb"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={dataChart}
        barSize={20} // Custom bar width
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(56, 118, 191, 0.38)" />
            <stop offset="75%" stopColor="rgba(56, 118, 191, 0.94)" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
        <XAxis
          dataKey="company_name"
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
          dataKey="count"
          fill="url(#colorUv)"
          background={<CustomBackground fill="#eee" radius={8} />}
          radius={[8, 8, 8, 8]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Rechartcompany1;
