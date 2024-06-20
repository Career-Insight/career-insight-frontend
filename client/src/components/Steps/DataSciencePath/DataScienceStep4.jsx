import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils"; // Correct path to your utils file

const DataScienceStep4 = ({ formData, setFormData }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      dataScience: { ...formData.dataScience, rSkills: data },
    });
    navigate("../summary");
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, 'dataScience.rSkills'));
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Please rate your skills in the following areas of R for data science:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <label className="mb-4">
          Data Manipulation:
          <input type="range" min="0" max="10" {...register("dataManipulation")} />
        </label>
        <label className="mb-4">
          Statistical Modeling:
          <input type="range" min="0" max="10" {...register("statisticalModeling")} />
        </label>
        <label className="mb-4">
          Visualization:
          <input type="range" min="0" max="10" {...register("visualization")} />
        </label>
        <label className="mb-4">
          Programming:
          <input type="range" min="0" max="10" {...register("programming")} />
        </label>
        <div className="flex space-x-4">
          <button type="button" onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      </form>
    </div>
  );
};

export default DataScienceStep4;
