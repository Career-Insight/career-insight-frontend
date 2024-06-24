import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const FrontEndStep2 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      frontEnd: { ...formData.frontEnd, needRefresher: data.needRefresher },
    });
    if (data.needRefresher === "no") {
      switch (formData.frontEnd.framework) {
        case "React":
          navigate("../frontEndSkillsReact");
          break;
        case "Angular":
          navigate("../frontEndSkillsAngular");
          break;
        default:
          navigate("../summary");
      }
    } else {
      navigate("../summary");
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "frontEnd.needRefresher"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[200vh] md:h-[100vh] flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold  w-[50%] mx-auto mb-6">
        Since {formData.frontEnd.framework} is a front-end framework/library, a
        sound knowledge of HTML, CSS, and JavaScript is essential. Would you
        like a refresher before starting {formData.frontEnd.framework}?
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
      >
        <div className="radio-input">
          <input
            id="yes"
            type="radio"
            value="yes"
            {...register("needRefresher", { required: true })}
          />{" "}
          <label htmlFor="yes" className="mb-4">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Yes</span>
            </div>
          </label>
          <input
            id="no"
            type="radio"
            value="no"
            {...register("needRefresher", { required: true })}
          />
          <label htmlFor="no" className="mb-4">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">No</span>
            </div>
          </label>
        </div>
        <div className="d-none">
          {errors.needRefresher && toast.error("Please select an option")}
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
  );
};

export default FrontEndStep2;
