import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils"; // Correct path to your utils file
import "../steps.css";
import toast from "react-hot-toast";

const DataScienceStep1 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
    setFormData(removeLastSavedData(formData, "dataScience.option"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div class="radio-input">
        <h2 className="text-2xl font-bold mb-6 p-3">
          Data science is the study of data, involving the extraction of
          knowledge from structured and unstructured data. What would you like
          to learn?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full max-w-lg p-5 bg-white shadow-md rounded"
          >
          <input
            id="value-1"
            type="radio"
            value="introDataScience"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-1">
            <div class="text">
              <span class="circle"></span>
              <span className="ml-2">Introduction to data science</span>
            </div>
          </label>
          <input
            id="value-2"
            type="radio"
            value="statAnalysisR"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-2">
            <div class="text">
              <span class="circle"></span>
              <span className="ml-2">Statistical analysis with R</span>
            </div>
          </label>
          <input
            id="value-3"
            type="radio"
            value="dataWrangling"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-3">
            <div class="text">
              <span class="circle"></span>
              <span className="ml-2">Data wrangling</span>
            </div>
          </label>
          <div className="d-none">
            {errors.option && toast.error("This field is required")}
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-bc hover:bg-pc transition-all text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-pc hover:bg-black text-white transition-all px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataScienceStep1;
