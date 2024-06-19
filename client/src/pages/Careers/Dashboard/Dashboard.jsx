import React, { useEffect, useState } from "react";
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
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
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
import Cookies from "js-cookie";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

export default function Dashboard() {
  const [jobsCount, setJobsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [dataBarBackend, setDataBarBackend] = useState([]);
  const [dataBarJob, setDataBarJob] = useState([]);
  const [selectedSkillTrack, setSelectedSkillTrack] = useState("full stack");
  const [selectedJobMonth, setSelectedJobMonth] = useState("year");
  useEffect(() => {
    dataBarBackendApiCalling();
    dataBarJobApiCalling();
    callApis(setJobsCount, "dashboard/jobs/count");
    callApis(setSkillsCount, "dashboard/skills/count");
    const countElement = document.getElementById("count1");
    const countElement2 = document.getElementById("count2");
    if (countElement) {
      intervalcount(countElement, jobsCount);
    }
    if (countElement2) {
      intervalcount(countElement2, skillsCount);
    }
  }, [selectedJobMonth, jobsCount, skillsCount]);
  if (dataBarBackend === null) {
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

  async function dataBarBackendApiCalling() {
    try {
      const { data } = await axios.get(
        "http://185.69.167.185:32381/api/v1/dashboard/general/backend-technologies/5",
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setDataBarBackend(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Preparing data for the VictoryBar chart
  const dataBarBackendChart = dataBarBackend.map((item) => ({
    x: item.k,
    y: Number(item.v),
    fill: "#323EFB",
  }));

  const dataBar1 = [
    { fill: "#95A4FC" },
    { fill: "#BAEDBD" },
    { fill: "#1C1C1C" },
    { fill: "#B1E3FF" },
    { fill: "#A8C5DA" },
    { fill: "#A1E3CB" },
  ];

  let dataBarMain = dataBarJob.map((job, index) => {
    return {
      ...job,
      fill: dataBar1[index % dataBar1.length].fill,
    };
  });

  function getSkillsTrack(value) {
    setSelectedSkillTrack(value);
  }

  function getJobMonth(value) {
    setSelectedJobMonth(value);
  }

  async function dataBarJobApiCalling() {
    try {
      const { data } = await axios.get(
        `http://185.69.167.185:32381/api/v1/dashboard/jobs${
          selectedJobMonth !== "year" ? `?year=${selectedJobMonth}` : ""
        }`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setDataBarJob(
        Object.entries(data).map(([key, value]) => {
          return { x: key, y: value };
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function callApis(setdata, endpoint) {
    try {
      const { data } = await axios.get(
        `http://185.69.167.185:32381/api/v1/${endpoint}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setdata(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  function intervalcount(ele, goal) {
    let conunter = Number(ele.innerText);
    const intervalclr = setInterval(() => {
      ele.innerText = conunter++;
      if (conunter > goal) {
        clearInterval(intervalclr);
      }
    }, 0 / goal);
  }
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
              <div className="text-2xl font-bold mb-3" id="count1">
                0
              </div>
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
              <div className="text-2xl font-bold mb-3">10</div>
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
              <div className="text-2xl font-bold mb-3" id="count2">
                0
              </div>
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
              <div className="text-lg font-bold mb-3">
                Frequency of job posting
              </div>
              <Select
                onValueChange={function (value) {
                  getJobMonth(value);
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <VictoryChart domainPadding={20}>
              {/* X-axis customization */}
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={[
                  "Full-Stack",
                  "Front-End",
                  "Back-End",
                  "DevOps",
                  "DataScientist",
                ]}
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 40 },
                  tickLabels: {
                    fontSize: 15,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  },
                }}
              />
              {/* Y-axis customization */}
              <VictoryAxis
                dependentAxis
                tickValues={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                tickFormat={(x) => `${x}`}
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 50 },
                  tickLabels: {
                    fontSize: 15,
                    padding: 10,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  },
                }}
              />
              <VictoryBar
                data={dataBarMain}
                style={{ data: { fill: ({ datum }) => datum.fill } }}
                alignment="middle"
                animate={{ duration: 800 }}
                cornerRadius={{ top: 8, bottom: 8 }}
                x="x"
                y="y"
              />
            </VictoryChart>
          </Card>
        </div>
        <div className="col-xl-5 col-md-6 my-3">
          <Card className="p-3 h-96">
            <div className="flex justify-between items-center mb-3">
              <div className="text- font-bold mb-3">Skills</div>
              <Select
                onValueChange={function (value) {
                  getSkillsTrack(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Full-Stack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full stack">Full-Stack</SelectItem>
                  <SelectItem value="front end">Front-End</SelectItem>
                  <SelectItem value="back end">Back-End</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Rechart1 selectedSkillTrackvalue={selectedSkillTrack} />
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
            <div className="text- font-bold">Top Back end technologies</div>
            <VictoryChart domainPadding={15}>
              {/* X-axis customization */}
              <VictoryAxis
                tickValues={dataBarBackend.map((item, index) => index + 1)} // Positions where ticks will appear
                tickFormat={dataBarBackend.map((item) => item.k)} // Labels for each tick
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 40 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 15,
                    padding: 10,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                    angle: 20,
                  }, // Styling for tick labels
                }}
              />
              {/* Y-axis customization */}
              <VictoryAxis
                dependentAxis // Indicates this is the y-axis
                tickFormat={(x) => `${x}`} // Format for tick labels
                style={{
                  axis: { stroke: "transparent" },
                  axisLabel: { padding: 50 }, // Padding for the axis label
                  // ticks: { stroke: "grey", size: 5 }, // Styling for ticks
                  tickLabels: {
                    fontSize: 12,
                    padding: 5,
                    fontWeight: "bold",
                    fill: "#1C1C1C66",
                  }, // Styling for tick labels
                }}
              />
              <VictoryBar
                data={dataBarBackendChart}
                style={{ data: { fill: ({ datum }) => datum.fill } }}
                alignment="middle"
                animate={{ duration: 800 }}
                cornerRadius={{ top: 8, bottom: 8 }}
                barWidth={25} // Set the width of the bars
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
