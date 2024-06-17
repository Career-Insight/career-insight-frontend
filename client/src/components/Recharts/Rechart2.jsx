import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Rechart2() {
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    pieApiCalling();
  }, []);
  async function pieApiCalling() {
    try {
      const { data } = await axios.get(
        "http://185.69.167.185:32381/api/v1/dashboard/general/frontend-technologies/5",
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setPieData(data);
    } catch (error) {
      console.log("error", error);
    }
  }
  const getOption = () => {
    return {
      title: {
        text: "Top front-end technologies",
        left: "left",
        textStyle: {
          fontSize: 14, // Set the font size for the title
          color: "#000",
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        left: "left",
        bottom: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: pieData.map((item) => ({
            value: item.v,
            name: item.k,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
