import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { authContext } from "./../../../context/authentication";
import { jwtDecode } from "jwt-decode";

const fetchRoadmaps = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/v1/static-roadmaps/all-roadmaps",
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  return data;
};

export default function OurRoadMaps() {
  const { userId } = jwtDecode(Cookies.get("token"));

  async function saveOurRoadMap(roadmapId, userId) {
    try {
      const { data } = await axios.post(
        "https://career-insight.me/api/v1/roadmaps/select-and-save",
        {
          userId,
          roadmapId,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: allOurRoadMaps,
    isLoading,
    error,
  } = useQuery(["allOurRoadMaps"], fetchRoadmaps);

  if (isLoading) {
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

  return (
    <>
      <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-75 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-bc">Our RoadMaps</h1>
          </div>
          <div className="mt-8 row gy-2">
            {allOurRoadMaps.map((roadmap, idx) => {
              return (
                <div key={idx} className="col-md-4">
                  <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-sm font-bold text-pc">
                        {roadmap.name}
                      </h2>
                      <div className="flex-col justify-center items-center">
                        <Link
                          to={`../${roadmap._id}`}
                          className="bg-bc hover:bg-pc transition-all block mb-2 text-white px-4 py-2 rounded-md"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => saveOurRoadMap(roadmap._id, userId)}
                          className="bg-green-500  hover:bg-pc transition-all block text-white px-4 py-2 rounded-md"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <h5 className="mb-2">
                        <span className="font-bold">created at :</span>{" "}
                        {roadmap.createdAt}
                      </h5>
                      <h5 className="mb-2">
                        <span className="font-bold">updated at :</span>{" "}
                        {roadmap.updatedAt}
                      </h5>
                      <h5>
                        <span className="font-bold">version :</span>{" "}
                        {roadmap.__v}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
