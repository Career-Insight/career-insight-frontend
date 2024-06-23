import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { SquareLibrary } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchYourRoadmaps = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/v1/roadmaps/user/${userId}`,
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  return data;
};

export default function YourSavedRoadMaps() {
  const token = Cookies.get("token");
  const { userId, userName } = jwtDecode(token);
  const {
    data: allYourRoadMaps,
    isLoading,
    error,
  } = useQuery(["allYourRoadMaps", userId], () => fetchYourRoadmaps(userId)); // Proper usage of fetch function

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  console.log(allYourRoadMaps);
  return (
    <>
      <div className="container-roadmap relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-100 px-4 sticky top-0 left-0 z-50 bg-wc">
          <div className="flex px-4 items-center text-bc mb-2 mt-4">
            <SquareLibrary
              width={25}
              height={25}
              className="mr-2"
              color="#000"
            />
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
          <div className="px-4 mr-2 mb-4">
            <h1 className="text-3xl text-px font-bold mb-2 text-pc">
              Your Saved RoadMaps
            </h1>
          </div>
        </div>
        {allYourRoadMaps.length === 0 && (
          <div className="h-[100vh] w-100 flex justify-center items-center ">
            <span className="block text-pc text-xl bg-wc shadow-md rounded-md font-bold p-5">
              No Saved RoadMaps
            </span>
          </div>
        )}
        <div className="w-100 py-3 px-16 ">
          <div className="mt-8 row gy-2">
            {allYourRoadMaps.map((roadmap, idx) => {
              return (
                <div key={idx} className="col-md-4">
                  <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-lg font-bold text-pc">
                        {roadmap.name}
                      </h2>
                      <Link
                        to={`../deletestaticroadmap/${roadmap._id}`}
                        className="bg-bc hover:bg-pc transition-all block mb-2 text-white px-4 py-2 rounded-md"
                      >
                        View
                      </Link>
                    </div>
                    <div className="w-full mt-2">
                      <div className="flex mb-3 items-center">
                        <button
                          onClick={() => {
                            deleteYourRoadMap(roadmap._id);
                          }}
                          className="block mr-2 text-lg text-pc hover:bg-pc rounded-lg p-2 hover:text-wc transition-all"
                        >
                          <i className="fa-solid fa-trash-can"></i>{" "}
                        </button>
                        <span className="block">delete from My Paths</span>
                      </div>
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
