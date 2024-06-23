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
import { SquareLibrary, TrendingUp } from "lucide-react";
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
        `http://localhost:8000/api/v1/roadmaps/user/${userId}/roadmap/${roadmapsgraph2}`,
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
        `http://localhost:8000/api/v1/roadmaps/user/${userId}/roadmap/${roadmapId}`,
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
  const {
    _id,
    name,
    RoadMap: { learning_plan, market_trends } = {},
  } = specificRoadmapData;
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
        <div className="col-md-4 flex flex-col justify-between items-center my-5 h-[280vh] md:h-[200vh]">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <TrendingUp width={30} height={30} color="#323efb" />
              <h2 className="text-3xl font-bold text-pc ml-2">Market Trends</h2>
            </div>

            {market_trends?.average_salary && (
              <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                <h3 className="text-xl mb-2 font-semibold text-gray-400">
                  <i className="fas fa-dollar-sign ml-2"></i> Average Salary :
                </h3>
                <p>
                  <span className="text-pc font-medium">Junior:</span>{" "}
                  {market_trends.average_salary.amount?.junior || "N/A"}
                </p>
                <p>
                  <span className="text-pc font-medium">Mid:</span>{" "}
                  {market_trends.average_salary.amount?.mid || "N/A"}
                </p>
                <p>
                  <span className="text-pc font-medium">Senior:</span>{" "}
                  {market_trends.average_salary.amount?.senior || "N/A"}
                </p>
                <p>
                  <span className="text-pc font-medium">Source:</span>{" "}
                  {market_trends.average_salary.source || "N/A"}
                </p>
              </div>
            )}

            {market_trends.job_outlook.developer_2023 && (
              <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                <h3 className="text-xl mb-2 font-semibold text-gray-400">
                  <i className="fas fa-laptop-house ml-2"></i> Job Outlook :
                </h3>
                <p>
                  <span className="text-pc font-medium">Growth:</span>{" "}
                  {market_trends.job_outlook.developer_2023.growth || "N/A"}
                </p>
                <p>
                  <span className="text-pc font-medium">
                    Rapid Growth Positions:
                  </span>
                  {market_trends.job_outlook.developer_2023
                    .rapid_growth_positions || "N/A"}
                </p>
              </div>
            )}
            {market_trends?.popular_sites && (
              <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                <h3 className="text-xl mb-2 font-semibold text-gray-400">
                  <i className="fas fa-business-time ml-2"></i> Popular Sites
                  Using React :
                </h3>
                <ul>
                  {market_trends.popular_sites.map((site, index) => (
                    <li key={index}>{site}</li>
                  ))}
                </ul>
              </div>
            )}
            {market_trends?.popular_companies && (
              <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                <h3 className="text-xl mb-2 font-semibold text-gray-400">
                  <i className="fas fa-business-time ml-2"></i> Popular
                  Companies Using React :
                </h3>
                <ul>
                  {market_trends.popular_companies.map((company, index) => (
                    <li key={index}>{company}</li>
                  ))}
                </ul>
              </div>
            )}
            {market_trends?.technologies_usage &&
              market_trends.technologies_usage.percentage && (
                <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                  <h3 className="text-xl mb-2 font-semibold text-gray-400">
                    <i className="fas fa-microchip ml-2"></i> React Technologies
                    Usage :
                  </h3>
                  <p>
                    <span className="text-pc font-medium">Percentage:</span>{" "}
                    {market_trends.technologies_usage.percentage || "N/A"}
                  </p>
                  <p>
                    <span className="text-pc font-medium">Source:</span>{" "}
                    {market_trends.technologies_usage.source || "N/A"}
                  </p>
                </div>
              )}
            {market_trends?.year_over_year_demand && (
              <div className="mb-4 p-4 bg-white border-1 rounded-md shadow-md border-pc">
                <h3 className="text-xl mb-2 font-semibold text-gray-400">
                  <i className="fas fa-calendar-alt ml-2"></i> Year Over Year
                  Demand :
                </h3>
                <p>
                  <span className="text-pc font-medium">Increase:</span>{" "}
                  {market_trends.year_over_year_demand.increase || "N/A"}
                </p>
                <p>
                  <span className="text-pc font-medium">Source:</span>{" "}
                  {market_trends.year_over_year_demand.source || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
