import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import "../steps.css";

const BackEndSkillsNodeJS = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [javascriptKnowledge, setJavascriptKnowledge] = useState(0);
  const [nodejsFramework, setNodejsFramework] = useState(0);
  const [microservices, setMicroservices] = useState(0);
  const [restAPI, setRestAPI] = useState(0);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      backEnd: { ...formData.backEnd, skills: data },
    });
    navigate("../summary");
  };

  const handlePrevious = () => {
    const updatedFormData = removeLastSavedData(formData, "backEnd.skills");
    setFormData(updatedFormData);
    navigate(-1);
  };

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-6">
        Please rate your skills in the following areas of Node.js:
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-5 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            JavaScript Knowledge: {javascriptKnowledge}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("javascriptKnowledge")}
              onChange={(e) => setJavascriptKnowledge(e.target.value)}
              value={javascriptKnowledge}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Node.js Framework: {nodejsFramework}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("nodejsFramework")}
              onChange={(e) => setNodejsFramework(e.target.value)}
              value={nodejsFramework}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Microservices: {microservices}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("microservices")}
              onChange={(e) => setMicroservices(e.target.value)}
              value={microservices}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            REST API: {restAPI}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("restAPI")}
              onChange={(e) => setRestAPI(e.target.value)}
              value={restAPI}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-bc hover:bg-pc transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Previous
          </button>
          <button
            type="submit"
            className="bg-pc hover:bg-bc transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackEndSkillsNodeJS;
