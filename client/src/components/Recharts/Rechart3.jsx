import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import Cookies from "js-cookie";

export default function Rechart3() {
  const [distributionOfOfferings, setDistributionOfOfferings] = useState([]);

  useEffect(() => {
    DistributionOfOfferingsCalling();
  }, []);

  async function DistributionOfOfferingsCalling() {
    try {
      const { data } = await axios.get(
        "https://career-insight.me/api/v1/dashboard/general/offering-distributions",
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setDistributionOfOfferings(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const chartData = [
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
  ];

  distributionOfOfferings.forEach((item) => {
    chartData.push([item.k, Number(item.v), "#357AF6", null]);
  });

  const options = {
    bar: { groupWidth: "80%" },
    legend: { position: "none" },
    height: 280,
  };

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
      />
    </div>
  );
}
