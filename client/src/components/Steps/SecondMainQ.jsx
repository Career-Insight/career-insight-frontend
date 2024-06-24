import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../utils";
import toast from "react-hot-toast";
import "./steps.css";

const SecondMainQ = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({ ...formData, path: data.path });
    switch (data.path) {
      case "dataScience":
        return navigate("../dataScienceStep1");
      case "backEnd":
        return navigate("../backEndStep1");
      case "frontEnd":
        return navigate("../frontEndStep1");
      case "devOps":
        return navigate("../devOpsStep1");
      default:
        return;
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "path"));
    navigate(-1);
  };

  return (
    <>
      <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
        <div className="radio-input">
          <h2 className="text-2xl font-bold mb-6">
            2. I want to learn something new.
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
          >
            <input
              id="value-1"
              type="radio"
              value="dataScience"
              {...register("path", { required: true })}
            />
            <label className="mb-4" htmlFor="value-1">
              <div className="text">
                <span className="circle"></span>
                <span className="ml-2">Data Science</span>
              </div>
            </label>

            <input
              id="value-2"
              type="radio"
              value="backEnd"
              {...register("path", { required: true })}
            />
            <label className="mb-4" htmlFor="value-2">
              <div className="text">
                <span className="circle"></span>
                <span className="ml-2">Back-end</span>
              </div>
            </label>

            <input
              id="value-3"
              type="radio"
              value="frontEnd"
              {...register("path", { required: true })}
            />
            <label className="mb-4" htmlFor="value-3">
              <div className="text">
                <span className="circle"></span>
                <span className="ml-2">Front-end</span>
              </div>
            </label>

            <input
              id="value-4"
              type="radio"
              value="devOps"
              {...register("path", { required: true })}
            />
            <label className="mb-4" htmlFor="value-4">
              <div className="text">
                <span className="circle"></span>{" "}
                <span className="ml-2">DevOps</span>
              </div>
            </label>

            <div className="d-none">
              {errors.path && toast.error("This field is required")}
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
    </>
  );
};

export default SecondMainQ;
