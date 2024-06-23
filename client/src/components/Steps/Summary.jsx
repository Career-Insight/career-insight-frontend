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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Thank You!</h2>
        <div className="w-full max-w-lg p-5 bg-white shadow-md rounded">
          <p className="mb-4 text-gray-700">
            Thank you for answering our questions. We appreciate your time and effort in providing this valuable information.
          </p>
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
