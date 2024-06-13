import React from "react";
import { Chart } from "react-google-charts";

export default function Rechart3() {
  const data = [
    [
      "Element",
      "Density",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Copper", 8.94, "#357AF6", null],
    ["Silver", 10.49, "#357AF6", null],
    ["Gold", 19.3, "#357AF6", null],
    ["Platinum", 21.45, "color: #357AF6", null],
  ];

  const options = {
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    height: 280,
  };
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
