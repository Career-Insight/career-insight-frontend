import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const FrontEndStep1 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.framework) {
      toast.error("Please select a framework");
    }
  }, [errors]);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      frontEnd: { ...formData.frontEnd, framework: data.framework },
    });
    navigate("../frontEndStep2");
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, "frontEnd.framework"));
    navigate(-1);
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="radio-input">
        <h2 className="text-2xl font-bold mb-6">
          Which front-end framework or library do you want to learn?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
        >
          <input
            id="value-angular"
            type="radio"
            value="Angular"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-angular">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Angular</span>
            </div>
          </label>
          <input
            id="value-react"
            type="radio"
            value="React"
            {...register("framework", { required: true })}
          />
          <label className="mb-4" htmlFor="value-react">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">React</span>
            </div>
          </label>
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

export default FrontEndStep1;
