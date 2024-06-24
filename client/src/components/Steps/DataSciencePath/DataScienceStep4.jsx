import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";

const DataScienceStep4 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [dataManipulation, setDataManipulation] = useState(0);
  const [statisticalModeling, setStatisticalModeling] = useState(0);
  const [visualization, setVisualization] = useState(0);
  const [programming, setProgramming] = useState(0);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      dataScience: { ...formData.dataScience, rSkills: data },
    });
    navigate("../summary");
  };

  const handlePrevious = () => {
    const updatedFormData = removeLastSavedData(
      formData,
      "dataScience.rSkills"
    );
    setFormData(updatedFormData);
    navigate(-1);
  };

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 w-100">
      <h2 className="text-2xl font-bold mb-6">
        Please rate your skills in the following areas of R for data science:
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" max-w-lg w-[50%] p-5 bg-white shadow-md rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Data Manipulation: {dataManipulation}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("dataManipulation")}
              onChange={(e) => setDataManipulation(e.target.value)}
              value={dataManipulation}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Statistical Modeling: {statisticalModeling}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("statisticalModeling")}
              onChange={(e) => setStatisticalModeling(e.target.value)}
              value={statisticalModeling}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Visualization: {visualization}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("visualization")}
              onChange={(e) => setVisualization(e.target.value)}
              value={visualization}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Programming: {programming}
            <input
              type="range"
              min="0"
              max="10"
              className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb"
              {...register("programming")}
              onChange={(e) => setProgramming(e.target.value)}
              value={programming}
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

export default DataScienceStep4;
