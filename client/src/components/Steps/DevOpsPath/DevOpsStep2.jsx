import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const DevOpsStep2 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      devOps: { ...formData.devOps, iacUnderstanding: data.iacUnderstanding },
    });
    if (data.iacUnderstanding === "yes") {
      return navigate("../devOpsSkillsIaC");
    } else {
      return navigate("../summary");
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "devOps.iacUnderstanding"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="radio-input">
        <h2 className="text-2xl font-bold mb-6">
          Did you have a Basic Understanding of IaC?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
          >
          <input
            id="value-yes"
            type="radio"
            value="yes"
            {...register("iacUnderstanding", { required: true })}
          />
          <label className="mb-4" htmlFor="value-yes">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Yes</span>
            </div>
          </label>

          <input
            id="value-no"
            type="radio"
            value="no"
            {...register("iacUnderstanding", { required: true })}
          />
          <label className="mb-4" htmlFor="value-no">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">No</span>
            </div>
          </label>

          <div className="d-none">
            {errors.iacUnderstanding && toast.error("This field is required")}
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

export default DevOpsStep2;
