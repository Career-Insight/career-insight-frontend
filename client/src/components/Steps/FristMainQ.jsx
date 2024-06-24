import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./steps.css";
import toast from "react-hot-toast";
const FirstMainQ = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({ ...formData, reason: data.reason });
    if (data.reason === "learn_new") {
      navigate("../second-main-q");
    } else {
      alert("Chat with Career Insight is not implemented yet.");
    }
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <div className="radio-input">
        <h2 className="text-2xl font-bold mb-6">
          1. Let’s get started. What brings you to Career Insight?
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[50%] mx-auto p-4 bg-white shadow-md rounded"
        >
          <input
            id="value-1"
            type="radio"
            value="learn_new"
            {...register("reason", { required: true })}
          />{" "}
          <label className="mb-4" htmlFor="value-1">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">I want to learn something new</span>
            </div>
          </label>
          <input
            id="value-2"
            type="radio"
            value="chat"
            {...register("reason", { required: true })}
          />
          <label className="mb-4" htmlFor="value-2">
            <div className="text">
              <span className="circle"></span>
              <span className="ml-2">Chat with Career Insight</span>
            </div>
          </label>
          <div className="d-none">
            {errors.reason && toast.error("This field is required")}
          </div>
          <div className="flex space-x-4">
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

export default FirstMainQ;
