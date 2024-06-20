import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils"; // Correct path to your utils file

const DataScienceStep3 = ({ formData, setFormData }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      dataScience: { ...formData.dataScience, learnDataWrangling: data.learnDataWrangling },
    });
    if (data.learnDataWrangling === "no") {
      navigate("../dataScienceStep5");
    } else {
      navigate("../summary");
    }
  };

  const handlePrevious = () => {
    setFormData(removeLastSavedData(formData, 'dataScience.learnDataWrangling'));
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Do you want to learn the fundamentals of data wrangling?</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <label className="mb-4">
          <input type="radio" value="yes" {...register("learnDataWrangling", { required: true })} />
          <span className="ml-2">Yes</span>
        </label>
        <label className="mb-4">
          <input type="radio" value="no" {...register("learnDataWrangling", { required: true })} />
          <span className="ml-2">No</span>
        </label>
        {errors.learnDataWrangling && <p className="text-red-500">This field is required</p>}
        <div className="flex space-x-4">
          <button type="button" onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      </form>
    </div>
  );
};

export default DataScienceStep3;
