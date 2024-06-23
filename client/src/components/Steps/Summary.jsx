import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";

const Summary = ({ formData }) => {
  const { handleSubmit } = useForm();
  const token = Cookies.get("token");
  const { userId } = jwtDecode(token);

  async function sendPrompt() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/ci-chat/generate",
        {
          prompt: JSON.stringify(formData), // Convert formData to string
          userId,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = () => {
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
    // sendPrompt();
  };

  const handlePrevious = () => {
    window.history.back();
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your answers</h2>
        <div className="w-full max-w-lg p-5 bg-white shadow-md rounded">
          {formData.reason && (
            <p className="mb-2">
              <strong className="text-gray-700">Reason: </strong>{" "}
              {formData.reason}
            </p>
          )}
          {formData.path && (
            <p className="mb-2">
              <strong className="text-gray-700">Path: </strong> {formData.path}
            </p>
          )}

          {formData.path === "dataScience" && (
            <>
              {formData.dataScience.option && (
                <p className="mb-2">
                  <strong className="text-gray-700">
                    Data Science Option:
                  </strong>{" "}
                  {formData.dataScience.option}
                </p>
              )}
              {formData.dataScience.learnFundamentalsR && (
                <p className="mb-2">
                  <strong className="text-gray-700">
                    Learn Fundamentals of R:
                  </strong>{" "}
                  {formData.dataScience.learnFundamentalsR}
                </p>
              )}
              {formData.dataScience.learnDataWrangling && (
                <p className="mb-2">
                  <strong className="text-gray-700">
                    Learn Data Wrangling:
                  </strong>{" "}
                  {formData.dataScience.learnDataWrangling}
                </p>
              )}
              {formData.dataScience.learnFundamentalsWrangling && (
                <p className="mb-2">
                  <strong className="text-gray-700">
                    Learn Fundamentals of Data Wrangling:
                  </strong>{" "}
                  {formData.dataScience.learnFundamentalsWrangling}
                </p>
              )}

              {Object.values(formData.dataScience.rSkills || {}).some(
                (skill) => skill !== ""
              ) && (
                <>
                  <h3 className="font-bold mt-4 text-gray-800 mb-1">
                    R Skills:
                  </h3>
                  {formData.dataScience.rSkills.dataManipulation && (
                    <p className="mb-2">
                      <strong className="text-gray-700">
                        Data Manipulation:
                      </strong>{" "}
                      {formData.dataScience.rSkills.dataManipulation}
                    </p>
                  )}
                  {formData.dataScience.rSkills.statisticalModeling && (
                    <p className="mb-2">
                      <strong className="text-gray-700">
                        Statistical Modeling:
                      </strong>{" "}
                      {formData.dataScience.rSkills.statisticalModeling}
                    </p>
                  )}
                  {formData.dataScience.rSkills.visualization && (
                    <p className="mb-2">
                      <strong className="text-gray-700">Visualization:</strong>{" "}
                      {formData.dataScience.rSkills.visualization}
                    </p>
                  )}
                  {formData.dataScience.rSkills.programming && (
                    <p className="mb-2">
                      <strong className="text-gray-700">Programming:</strong>{" "}
                      {formData.dataScience.rSkills.programming}
                    </p>
                  )}
                </>
              )}

              {Object.values(
                formData.dataScience.dataWranglingSkills || {}
              ).some((skill) => skill !== "") && (
                <>
                  <h3 className="font-bold mt-4 text-gray-800">
                    Data Wrangling Skills:
                  </h3>
                  {formData.dataScience.dataWranglingSkills
                    .dataManipulation && (
                    <p className="mb-2">
                      <strong className="text-gray-700">
                        Data Manipulation:
                      </strong>{" "}
                      {
                        formData.dataScience.dataWranglingSkills
                          .dataManipulation
                      }
                    </p>
                  )}
                  {formData.dataScience.dataWranglingSkills
                    .statisticalModeling && (
                    <p className="mb-2">
                      <strong className="text-gray-700">
                        Statistical Modeling:
                      </strong>{" "}
                      {
                        formData.dataScience.dataWranglingSkills
                          .statisticalModeling
                      }
                    </p>
                  )}
                  {formData.dataScience.dataWranglingSkills.visualization && (
                    <p className="mb-2">
                      <strong className="text-gray-700">Visualization:</strong>{" "}
                      {formData.dataScience.dataWranglingSkills.visualization}
                    </p>
                  )}
                  {formData.dataScience.dataWranglingSkills.programming && (
                    <p className="mb-2">
                      <strong className="text-gray-700">Programming:</strong>{" "}
                      {formData.dataScience.dataWranglingSkills.programming}
                    </p>
                  )}
                </>
              )}
            </>
          )}

          {formData.path === "backEnd" && formData.backEnd.framework && (
            <p className="mb-2">
              <strong className="text-gray-700">Back-end Framework:</strong>{" "}
              {formData.backEnd.framework}
            </p>
          )}

          {formData.path === "frontEnd" && formData.frontEnd.framework && (
            <p className="mb-2">
              <strong className="text-gray-700">Front-end Framework:</strong>{" "}
              {formData.frontEnd.framework}
            </p>
          )}

          {formData.path === "devOps" && formData.devOps.option && (
            <p className="mb-2">
              <strong className="text-gray-700">DevOps Option:</strong>{" "}
              {formData.devOps.option}
            </p>
          )}
          <div className="flex space-x-4">
            <button
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate My RoadMap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
