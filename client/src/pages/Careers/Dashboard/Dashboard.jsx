import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  BarChartBig,
  Box,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { DatePickerDemo } from "../../../components/Datepicker/DatePickerDemo";
import Rechart1 from "./../../../components/Recharts/Rechart1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Rechart2 from "./../../../components/Recharts/Rechart2";
import Rechart3 from "./../../../components/Recharts/Rechart3";
import Rechart4 from "./../../../components/Recharts/Rechart4";

export default function Dashboard() {
  const dataBar1 = [
    { x: 1, y: 15, fill: "#95A4FC" },
    { x: 2, y: 17, fill: "#BAEDBD" },
    { x: 3, y: 20, fill: "#1C1C1C" },
    { x: 4, y: 18, fill: "#B1E3FF" },
    { x: 5, y: 22, fill: "#A8C5DA" },
    { x: 6, y: 33, fill: "#A1E3CB" },
  ];

  return (
    <>
      <div className="row justify-content-between">
        <div className="col-md-4 my-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-gray-500 font-medium">
                No. of Scrapping job
              </CardTitle>
              <span className="block bg-purple-100 p-2 rounded-2xl">
                <Users
                  color="#8280FF"
                  className="w-8 h-8 text-muted-foreground"
                />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-3">309</div>
              <p className="text-xs text-muted-foreground flex">
                <TrendingUp color="#00B69B" />
                <span className="text-v1 ml-2 font-bold mr-1">8.5%</span> Up
                from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="col-md-4 my-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-gray-500 font-medium">
                No. of cities
              </CardTitle>
              <span className="block bg-yellow-200 p-2 rounded-2xl">
                <Box
                  color="#FEC53D"
                  className="w-8 h-8 text-muted-foreground"
                />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-3">10293</div>
              <p className="text-xs text-muted-foreground flex">
                <TrendingUp color="#00B69B" />
                <span className="text-v1 ml-2 font-bold mr-1">1.3%</span> Up
                from past week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="col-md-4 my-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-gray-500 font-medium">
                No. of Skills
              </CardTitle>
              <span className="block bg-green-200 p-2 rounded-2xl">
                <BarChartBig
                  color="#4AD991"
                  className="w-8 h-8 text-muted-foreground"
                />
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-3">$89,000</div>
              <p className="text-xs text-muted-foreground flex">
                <TrendingDown color="#F93C65" />
                <span className="text-e1 ml-2 font-bold mr-1">4.3%</span> Down
                from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* //////////////////////////////////////////// */}
      <div className="row justify-content-between">
        <div className="col-xl-4 col-md-6 my-3">
          <Card className="p-3 h-96">
            <div className="flex justify-between items-center">
              <div className="text- font-bold mb-3">
                Frequency of job posting
              </div>
              <DatePickerDemo />
            </div>
            <VictoryChart domainPadding={20}>
              {/* X-axis customization */}
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6]} // Positions where ticks will appear
                tickFormat={[
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                ]} // Labels for each tick
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 40 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 15,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  }, // Styling for tick labels
                }}
              />
              {/* Y-axis customization */}
              <VictoryAxis
                dependentAxis // Indicates this is the y-axis
                tickFormat={(x) => `${x}°C`} // Format for tick labels
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 50 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 15,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  }, // Styling for tick labels
                }}
              />
              <VictoryBar
                data={dataBar1}
                style={{ data: { fill: ({ datum }) => datum.fill } }}
                alignment="middle"
                animate={{ duration: 800 }}
                cornerRadius={{ top: 8, bottom: 8 }}
              />
            </VictoryChart>
          </Card>
        </div>
        <div className="col-xl-5 col-md-6 my-3">
          <Card className="p-3 h-96">
            <div className="flex justify-between items-center mb-3">
              <div className="text- font-bold mb-3">Skills</div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Rechart1 />
          </Card>
        </div>
        <div className="col-xl-3 col-md-6 my-3">
          <Card className="p-3 h-96">
            <Rechart2 />
          </Card>
        </div>
      </div>
      {/* ////////////////////////////////////////// */}
      <div className="row justify-content-between">
        <div className="col-xl-4 col-md-6 my-3">
          <Card className="p-3 h-80">
            <div className="text- font-bold mb-3">
              Programing language distribution
            </div>
            <Rechart4 />
          </Card>
        </div>
        <div className="col-xl-4 col-md-6 my-3">
          <Card className="p-3 h-80">
            <div className="text- font-bold">
              Top Back end technologies
            </div>
            <VictoryChart domainPadding={20}>
              {/* X-axis customization */}
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6]} // Positions where ticks will appear
                tickFormat={[
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                ]} // Labels for each tick
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 40 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 15,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  }, // Styling for tick labels
                }}
              />
              {/* Y-axis customization */}
              <VictoryAxis
                dependentAxis // Indicates this is the y-axis
                tickFormat={(x) => `${x}°C`} // Format for tick labels
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 50 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 15,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  }, // Styling for tick labels
                }}
              />
              <VictoryBar
                data={dataBar1}
                style={{ data: { fill: "#323EFB" } }}
                alignment="middle"
                animate={{ duration: 800 }}
                cornerRadius={{ top: 8, bottom: 8 }}
                barWidth={35} // Set the width of the bars
              />
            </VictoryChart>
          </Card>
        </div>
        <div className="col-xl-4 col-md-6 my-3">
          <Card className="p-3 h-80">
            <div className="text- font-bold">Distribution of Offerings</div>
            <Rechart3 />
          </Card>
        </div>
      </div>
    </>
  );
}
