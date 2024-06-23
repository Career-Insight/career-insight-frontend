import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import toast from "react-hot-toast";
import "../steps.css";

const BackEndStep2 = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      backEnd: { ...formData.backEnd, needRefresher: data.needRefresher },
    });
    if (data.needRefresher === "no") {
      switch (formData.backEnd.framework) {
        case "Spring Boot":
          navigate("../backEndSkillsSpringBoot");
          break;
        case "Flask":
          navigate("../backEndSkillsFlask");
          break;
        case "Django":
          navigate("../backEndSkillsDjango");
          break;
        case "Node.js":
          navigate("../backEndSkillsNodeJS");
          break;
        case "PHP":
          navigate("../backEndSkillsPHP");
          break;
        default:
          navigate("../summary");
      }
    } else {
      navigate("../summary");
    }
  };

  const handlePrevious = () => {
    const updatedFormData = removeLastSavedData(
      formData,
      "backEnd.needRefresher"
    );
    setFormData(updatedFormData);
    navigate(-1);
  };

  const getFrameworkMessage = () => {
    switch (formData.backEnd.framework) {
      case "Spring Boot":
        return "Spring Boot is a Java framework for creating production-grade applications and services. Therefore, it is essential to have a good grip of Java to understand the concepts of Spring Boot. Would you like a Java refresher before starting Spring Boot?";
      case "Flask":
        return "Flask is a micro web framework written in Python, and requires hands-on Python knowledge to get started with Flask. Would you like a Python refresher before starting Flask?";
      case "Django":
        return "Django is a high-level Python web framework, and it is essential to have a good grip of Python to understand the concepts of Django. Would you like a Python refresher before starting Django?";
      case "Node.js":
        return "Node.js is a JavaScript runtime environment and requires a sound understanding of JavaScript before it can be used to make web applications. Would you like a JavaScript refresher before starting Node.js?";
      case "PHP":
        return "PHP is a popular general-purpose scripting language that is especially suited to web development. Would you like a PHP refresher before starting PHP?";
      default:
        return "";
    }
  };

  return (
    <div className="container-roadmap h-[100vh] bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6">{getFrameworkMessage()}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full max-w-lg p-5 bg-white shadow-md rounded"
      >
        <div className="radio-input">
          <input
            id="yes"
            type="radio"
            value="yes"
            {...register("needRefresher", { required: true })}
          />
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

export default BackEndStep2;
