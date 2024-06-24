import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import "../steps.css";

const FrontEndSkillsReact = ({ formData, setFormData }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [html, setHtml] = useState(0);
  const [css, setCss] = useState(0);
  const [javascript, setJavascript] = useState(0);
  const [reactBasics, setReactBasics] = useState(0);
  const [stateManagement, setStateManagement] = useState(0);
  const [redux, setRedux] = useState(0);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      frontEnd: {
        ...formData.frontEnd,
        skills: {
          html,
          css,
          javascript,
          reactBasics,
          stateManagement,
          redux,
        },
      },
    });
    navigate("../summary");
  };

  const handlePrevious = () => {
    const updatedFormData = removeLastSavedData(formData, "frontEnd.skills");
    setFormData(updatedFormData);
    navigate(-1);
  };

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-6">
        Please rate your skills in the following areas of React:
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-5 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            HTML: {html}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("html")}
              onChange={(e) => setHtml(e.target.value)}
              value={html}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            CSS: {css}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("css")}
              onChange={(e) => setCss(e.target.value)}
              value={css}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            JavaScript: {javascript}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("javascript")}
              onChange={(e) => setJavascript(e.target.value)}
              value={javascript}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            React Basics: {reactBasics}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("reactBasics")}
              onChange={(e) => setReactBasics(e.target.value)}
              value={reactBasics}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State Management: {stateManagement}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("stateManagement")}
              onChange={(e) => setStateManagement(e.target.value)}
              value={stateManagement}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Redux: {redux}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("redux")}
              onChange={(e) => setRedux(e.target.value)}
              value={redux}
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

export default FrontEndSkillsReact;
