import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";
import { BallTriangle } from "react-loader-spinner";

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

const getCompanyNameSelect = async (companyname) => {
  console.log("companyname", companyname);
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/review/get-rating/?company_name=${companyname}`,
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const preprocessData = (data) => {
  return data.filter((item) => item._id >= "2008-01");
};

const EChartsComponent = ({ companyname }) => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      setLoading(true);
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);

      const _rawData = await getCompanyNameSelect(companyname);

      if (!_rawData) {
        setLoading(false);
        return;
      }

      const filteredData = preprocessData(_rawData);

      const option = {
        dataset: {
          source: filteredData,
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          name: "Date",
          nameLocation: "middle",
          nameGap: 30, // Add margin between name and axis
        },
        yAxis: {
          name: "Average Rating",
        },
        series: [
          {
            type: "line",
            showSymbol: false,
            encode: {
              x: "_id",
              y: "avg_rating",
              itemName: "_id",
              tooltip: ["avg_rating"],
            },
          },
        ],
      };

      myChart.setOption(option);
      setLoading(false);

      // Cleanup on component unmount
      return () => {
        myChart.dispose();
      };
    };

    fetchDataAndRenderChart();
  }, [companyname]);

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      {loading && (
        <div
          className="w-100 h-100 flex justify-center items-center"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#323efb"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      )}
      <div
        ref={chartRef}
        style={{ width: "100%", height: "100%", opacity: loading ? 0 : 1 }}
      ></div>
    </div>
  );
};

export default EChartsComponent;
