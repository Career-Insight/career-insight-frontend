import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils"; // Correct path to your utils file

const DataScienceStep1 = ({ formData, setFormData }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      dataScience: { ...formData.dataScience, option: data.option },
    });
    if (data.option === "introDataScience") {
      navigate("../summary");
    } else if (data.option === "statAnalysisR") {
      // Handle other options or proceed to summary
      navigate("../dataScienceStep2");
    } else if (data.option === "dataWrangling") {
      // Handle other options or proceed to summary
      navigate("../dataScienceStep3");
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, 'dataScience.option'));
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">
        Data science is the study of data, involving the extraction of knowledge
        from structured and unstructured data. What would you like to learn?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <label className="mb-4">
          <input type="radio" value="introDataScience" {...register("option", { required: true })} />
          <span className="ml-2">Introduction to data science</span>
        </label>
        <label className="mb-4">
          <input type="radio" value="statAnalysisR" {...register("option", { required: true })} />
          <span className="ml-2">Statistical analysis with R</span>
        </label>
        <label className="mb-4">
          <input type="radio" value="dataWrangling" {...register("option", { required: true })} />
          <span className="ml-2">Data wrangling</span>
        </label>
        {errors.option && <p className="text-red-500">This field is required</p>}
        <div className="flex space-x-4">
          <button type="button" onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      </form>
    </div>
  );
};

export default DataScienceStep1;
