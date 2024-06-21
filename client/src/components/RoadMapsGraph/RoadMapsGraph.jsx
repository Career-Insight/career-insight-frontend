import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./roadmapsgraph.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BallTriangle } from "react-loader-spinner";

export default function RoadMapsGraph() {
  const { roadmapsgraph } = useParams();
  const [specificRoadmapData, setSpecificRoadmapData] = useState(null);
  useEffect(() => {
    fetchSpecifcRoadmap();
    return () => {};
  }, []);
  async function fetchSpecifcRoadmap() {
    try {
      const { data } = await axios.get(
        `https://career-insight.me/api/v1/static-roadmaps/roadmap/${roadmapsgraph}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      setSpecificRoadmapData(data);
    } catch (error) {
      console.log(error);
    }
  }

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

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <VerticalTimeline lineColor="#323efb">
        {stages.map((stage, idx) => {
          const stageData = specificRoadmapData.RoadMap.learning_plan[stage];
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
              date={stage}
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
                  <p className="mb-2">{stageData.projects[1].description}</p>
                  <ul className="vertical-timeline-element-subtitle list-disc list-inside ml-5">
                    {stageData.projects[1].features.map((item, idx) => {
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
  );
}
{
  /* <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "#fff",
            color: "#000",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          contentArrowStyle={{ borderRight: "10px solid  black" }}
          date="Stage 1: Fundamentals"
          dateClassName="custom-date"
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
          icon={<span className="block">1</span>}
        >
          <h3 className="vertical-timeline-element-title">Fundamentals</h3>
          <h4 className="vertical-timeline-element-subtitle">
            HTML5, CSS3, JavaScript ES6+
          </h4>
          <p>Resources: MDN Web Docs, JavaScript.info, freeCodeCamp</p>
        </VerticalTimelineElement> */
}
