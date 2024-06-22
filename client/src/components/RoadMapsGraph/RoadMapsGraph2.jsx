import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./roadmapsgraph.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BallTriangle } from "react-loader-spinner";
import { jwtDecode } from "jwt-decode";
import { SquareLibrary } from "lucide-react";
import toast from "react-hot-toast";

export default function RoadMapsGraph2() {
  const { roadmapsgraph2 } = useParams();
  const [specificRoadmapData, setSpecificRoadmapData] = useState(null);
  const token = Cookies.get("token");
  const { userId, userName } = jwtDecode(token);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSpecifcRoadmap();
    return () => {};
  }, []);
  async function fetchSpecifcRoadmap() {
    try {
      const { data } = await axios.get(
        `https://career-insight.me/api/v1/roadmaps/user/${userId}/roadmap/${roadmapsgraph2}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );

      setSpecificRoadmapData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteYourRoadMap = async (roadmapId) => {
    try {
      const { data } = await axios.delete(
        `https://career-insight.me/api/v1/roadmaps/user/${userId}/roadmap/${roadmapId}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      console.log("dlete ", data);
      if (data.message === "Roadmap deleted successfully") {
        toast.error("Roadmap deleted successfully");
        navigate("/roadmaps/yourroadmaps");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(specificRoadmapData);
  if (!specificRoadmapData) {
    return (
      <div className="w-100 h-[100vh] flex justify-center items-center">
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
  const stages = Object.keys(specificRoadmapData?.RoadMap?.learning_plan);
  const MarketTrends = specificRoadmapData.RoadMap.market_trends;

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="w-100 px-4 sticky top-0 left-0 z-50 bg-wc">
        <div className="flex px-4 items-center text-bc mb-2 mt-4">
          <SquareLibrary width={25} height={25} className="mr-2" color="#000" />
          <span className="block mr-2">hello {userName}</span>
          <i className="block text-gray-300 text-[8px] fa-solid fa-circle mr-2"></i>
          <span
            className="block p-1 rounded-md"
            style={{
              backgroundColor: "hsl(54.92deg 96.72% 88.04%)",
              color: "hsl(31.76deg 80.95% 28.82%)",
            }}
          >
            Curated by experts
          </span>
        </div>
        <div className="px-4 mr-2">
          <h1 className="text-3xl text-px font-bold mb-2 text-pc">
            {specificRoadmapData.name}
          </h1>
          <div className="flex mb-3 items-center">
            <button
              onClick={() => {
                deleteYourRoadMap(specificRoadmapData._id);
              }}
              className="block mr-2 text-lg text-pc hover:bg-pc rounded-lg p-2 hover:text-wc transition-all"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <span className="block">Delete from My Paths</span>
          </div>
        </div>
      </div>
      <div className="row w-100 px-4">
        <div className="col-md-8">
          <VerticalTimeline lineColor="#323efb" layout="1-column-left">
            {stages.map((stage, idx) => {
              const stageData =
                specificRoadmapData.RoadMap.learning_plan[stage];
              return (
                <VerticalTimelineElement
                  key={idx}
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "#fff",
                    color: "#000",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                  contentArrowStyle={{ borderRight: "10px solid  black" }}
                  iconStyle={{
                    background: "#323efb",
                    color: "#fff",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    border: "3px solid black",
                  }}
                  icon={<span className="block">{idx + 1}</span>}
                >
                  <h3 className="vertical-timeline-element-title text-pc font-bold mb-3">
                    {stage}
                  </h3>

                  {stageData.description && (
                    <div>
                      <p className="mb-3">{stageData.description}</p>
                    </div>
                  )}

                  <ul className="vertical-timeline-element-subtitle list-disc list-inside ml-5 mb-3">
                    {stageData.topics && <h4>Topics :</h4>}
                    {stageData.topics &&
                      stageData.topics.map((item, idx) => {
                        return (
                          <li className="topicspullets" key={idx}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                  <ul className="vertical-timeline-element-subtitle list-disc list-inside ml-5">
                    {stageData.resources && <h4>Resources :</h4>}
                    {stageData.resources &&
                      stageData.resources.map((item, idx) => {
                        return (
                          <li className="topicspullets" key={idx}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>

                  {stageData.projects && (
                    <>
                      <h3 className="text-gray-500 mb-2">
                        {stageData.projects[1].title}
                      </h3>
                      <p className="mb-2">
                        {stageData.projects[1].description}
                      </p>
                      <ul className="vertical-timeline-element-subtitle list-disc list-inside ml-5">
                        {stageData.projects[1].features.map((item, idx) => {
                          return (
                            <li className="topicspullets" key={idx}>
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                      <h3 className="text-gray-500 mt-3 mb-2">
                        {stageData.projects[3].title}
                      </h3>
                      <p className="mb-2">
                        {stageData.projects[3].description}
                      </p>
                      <ul className="vertical-timeline-element-subtitle list-disc list-inside ml-5">
                        {stageData.projects[3].features.map((item, idx) => {
                          return (
                            <li className="topicspullets" key={idx}>
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
        <div className="col-md-4 bg-black text-wc relative">
          {/* <div className="sticky top-0 left-0 bg-red-500">
            <h2 className="text-2xl font-bold">Market Trends</h2>
            <div className="">
              <h3 className="text-xl font-semibold">Average Salary</h3>
              <p>Junior: {MarketTrends.average_salary.amount.junior}</p>
              <p>Mid: {average_salary.amount.mid}</p>
              <p>Senior: {average_salary.amount.senior}</p>
              <p>Source: {average_salary.source}</p>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Job Outlook</h3>
              <p>Growth: {job_outlook.react_developer_2023.growth}</p>
              <p>
                Rapid Growth Positions:{" "}
                {job_outlook.react_developer_2023.rapid_growth_positions}
              </p>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">
                Popular Sites Using React
              </h3>
              <ul>
                {popular_sites_using_react.map((site, index) => (
                  <li key={index}>{site}</li>
                ))}
              </ul>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">
                React Technologies Usage
              </h3>
              <p>Percentage: {react_technologies_usage.percentage}</p>
              <p>Source: {react_technologies_usage.source}</p>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Year Over Year Demand</h3>
              <p>Increase: {year_over_year_demand.increase}</p>
              <p>Source: {year_over_year_demand.source}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
