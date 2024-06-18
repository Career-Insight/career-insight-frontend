import React, { useContext, useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const Rechartcompany3 = ({ selectedCompanyName }) => {
  const chartRef = useRef(null);
//   console.log(selectedCompanyName);
  // Define the raw data directly in the component
  const rawData = [
    ["Country", "Year", "Income"],
    ["Germany", 1950, 10000],
    ["Germany", 1960, 12000],
    ["Germany", 1970, 15000],
    ["Germany", 1980, 20000],
    ["Germany", 1990, 25000],
    ["Germany", 2000, 30000],
    ["Germany", 2010, 35000],
    ["Germany", 2020, 40000],
    ["France", 1950, 11000],
    ["France", 1960, 13000],
    ["France", 1970, 16000],
    ["France", 1980, 21000],
    ["France", 1990, 26000],
    ["France", 2000, 31000],
    ["France", 2010, 36000],
    ["France", 2020, 41000],
  ];

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const run = (rawData, chartInstance) => {
      const option = {
        dataset: [
          {
            id: "dataset_raw",
            source: rawData,
          },
          {
            id: "dataset_since_1950_of_germany",
            fromDatasetId: "dataset_raw",
            transform: {
              type: "filter",
              config: {
                and: [
                  { dimension: "Year", gte: 1950 },
                  { dimension: "Country", "=": "Germany" },
                ],
              },
            },
          },
          {
            id: "dataset_since_1950_of_france",
            fromDatasetId: "dataset_raw",
            transform: {
              type: "filter",
              config: {
                and: [
                  { dimension: "Year", gte: 1950 },
                  { dimension: "Country", "=": "France" },
                ],
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          nameLocation: "middle",
        },
        yAxis: {
          name: "Income",
        },
        series: [
          {
            type: "line",
            datasetId: "dataset_since_1950_of_germany",
            showSymbol: false,
            encode: {
              x: "Year",
              y: "Income",
              itemName: "Year",
              tooltip: ["Income"],
            },
          },
          {
            type: "line",
            datasetId: "dataset_since_1950_of_france",
            showSymbol: false,
            encode: {
              x: "Year",
              y: "Income",
              itemName: "Year",
              tooltip: ["Income"],
            },
          },
        ],
      };
      chartInstance.setOption(option);
    };

    run(rawData, chartInstance);

    return () => {
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default Rechartcompany3;
