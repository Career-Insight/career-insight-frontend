import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import "../steps.css";

const FrontEndSkillsAngular = ({ formData, setFormData }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [html, setHtml] = useState(0);
  const [css, setCss] = useState(0);
  const [javascript, setJavascript] = useState(0);
  const [angularBasics, setAngularBasics] = useState(0);
  const [typescript, setTypescript] = useState(0);
  const [ngrx, setNgrx] = useState(0);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      frontEnd: {
        ...formData.frontEnd,
        skills: {
          html,
          css,
          javascript,
          angularBasics,
          typescript,
          ngrx,
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
        Please rate your skills in the following areas of Angular:
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
            Angular Basics: {angularBasics}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("angularBasics")}
              onChange={(e) => setAngularBasics(e.target.value)}
              value={angularBasics}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            TypeScript: {typescript}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("typescript")}
              onChange={(e) => setTypescript(e.target.value)}
              value={typescript}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            NgRx: {ngrx}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("ngrx")}
              onChange={(e) => setNgrx(e.target.value)}
              value={ngrx}
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

export default FrontEndSkillsAngular;
