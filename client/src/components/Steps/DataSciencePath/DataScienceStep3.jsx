import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils"; // Correct path to your utils file
import "../steps.css";
import toast from "react-hot-toast";

const DataScienceStep3 = ({ formData, setFormData }) => {
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
      dataScience: {
        ...formData.dataScience,
        learnFundamentalsWrangling: data.learnFundamentalsWrangling,
      },
    });
    if (data.learnFundamentalsWrangling === "no") {
      navigate("../dataScienceStep5");
    } else {
      navigate("../summary");
    }
  };

  const handlePrevious = () => {
    setFormData(
      removeLastSavedData(formData, "dataScience.learnFundamentalsWrangling")
    );
    navigate(-1);
  };

  return (
    <>
      <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
        <div className="radio-input">
          <h2 className="text-2xl font-bold mb-6">
            Do you want to learn the fundamentals of data wrangling?
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
          >
            <input
              id="value-1"
              type="radio"
              value="yes"
              {...register("learnFundamentalsWrangling", { required: true })}
            />
            <label className="mb-4" htmlFor="value-1">
              <div className="text">
                <span className="circle"></span>
                <span className="ml-2">Yes</span>
              </div>
            </label>
            <input
              id="value-2"
              type="radio"
              value="no"
              {...register("learnFundamentalsWrangling", { required: true })}
            />
            <label className="mb-4" htmlFor="value-2">
              <div className="text">
                <span className="circle"></span>
                <span className="ml-2">No</span>
              </div>
            </label>

            <div className="d-none">
              {errors.learnFundamentalsWrangling &&
                toast.error("This field is required")}
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
    </>
  );
};

export default DataScienceStep3;
