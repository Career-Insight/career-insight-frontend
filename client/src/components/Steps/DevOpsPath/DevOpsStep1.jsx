import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const DevOpsStep1 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      devOps: { ...formData.devOps, option: data.option },
    });
    switch (data.option) {
      case "Fundamentals of DevOps":
        return navigate("../summary");
      case "Infrastructure as Code":
        return navigate("../devOpsStep2");
      case "Cloud Providers":
        return navigate("../devOpsStep3");
      default:
        return;
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "devOps.option"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[200vh] md:h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="radio-input">
        <h2 className="text-2xl font-bold mb-6 w-[50%]">
          DevOps is a combination of various tools and practices that increases
          an organization’s ability to deliver services quickly and efficiently.
          What would you like to learn?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
          >
          <input
            id="value-1"
            type="radio"
            value="Fundamentals of DevOps"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-1">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Fundamentals of DevOps</span>
            </div>
          </label>

          <input
            id="value-2"
            type="radio"
            value="Infrastructure as Code"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-2">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Infrastructure as Code</span>
            </div>
          </label>

          <input
            id="value-3"
            type="radio"
            value="Cloud Providers"
            {...register("option", { required: true })}
          />
          <label className="mb-4" htmlFor="value-3">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Cloud Providers</span>
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
              className="bg-pc hover:bg-bc transition-all text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DevOpsStep1;
