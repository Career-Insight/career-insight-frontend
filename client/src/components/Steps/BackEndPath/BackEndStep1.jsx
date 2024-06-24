import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const BackEndStep1 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      backEnd: { ...formData.backEnd, framework: data.framework },
    });
    navigate("../backEndStep2");
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "backEnd.framework"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="radio-input">
        <h2 className="text-2xl font-bold mb-6">
          Back-end frameworks help build the back-end structure of a website.
          Which framework would you like to learn?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
        >
          <input
            id="value-1"
            type="radio"
            value="Spring Boot"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-1">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Spring Boot</span>
            </div>
          </label>

          <input
            id="value-2"
            type="radio"
            value="Flask"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-2">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Flask</span>
            </div>
          </label>

          <input
            id="value-3"
            type="radio"
            value="Django"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-3">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Django</span>
            </div>
          </label>

          <input
            id="value-4"
            type="radio"
            value="Node.js"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-4">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Node.js</span>
            </div>
          </label>

          <input
            id="value-5"
            type="radio"
            value="PHP"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-5">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">PHP</span>
            </div>
          </label>

          <div className="d-none">
            {errors.framework && toast.error("This field is required")}
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

export default BackEndStep1;
