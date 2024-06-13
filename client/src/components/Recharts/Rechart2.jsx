import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Rechart2() {
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
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
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
