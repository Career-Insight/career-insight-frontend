import React from "react";
import { Chart } from "react-google-charts";

export default function Rechart4() {
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
    ["Copper", 80.94, "#357AF6", null],
    ["Silver", 100.49, "#357AF6", null],
    ["Gold", 190.3, "#357AF6", null],
    ["Platinum", 210.45, "color: #357AF6", null],
    ["Platinum1", 201.45, "color: #357AF6", null],
    ["Platinum2", 300.45, "color: #357AF6", null],
    ["Platinum3", 440.45, "color: #357AF6", null],
    ["Platinum4", 500.45, "color: #357AF6", null],
    ["Platinum5", 600.45, "color: #357AF6", null],
  ];

  const options = {
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
    height: 250,
  };

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}
