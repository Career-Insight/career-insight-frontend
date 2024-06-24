import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeLastSavedData } from "../../../utils";
import "../steps.css";

const DevOpsSkillsIaC = ({ formData, setFormData }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [paython, setpaython] = useState(0);
  const [systemAdmin, setsystemAdmin] = useState(0);
  const [bash, setbash] = useState(0);
  const [docker, setdocker] = useState(0);

  const onSubmit = (data) => {
    setFormData({
      ...formData,
      devOps: {
        ...formData.devOps,
        iacSkills: {
          paython,
          systemAdmin,
          bash,
          docker,
        },
      },
    });
    navigate("../summary");
  };

  const handlePrevious = () => {
    const updatedFormData = removeLastSavedData(formData, "devOps.iacSkills");
    setFormData(updatedFormData);
    navigate(-1);
  };

  return (
    <div className="container-roadmap flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-6">Please rate your skills in the following areas of IaC:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-5 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          paython: {paython}
            <input type="range" min="0" max="10" className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb" {...register("paython")} onChange={(e) => setpaython(e.target.value)} value={paython} />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          system administration: {systemAdmin}
            <input type="range" min="0" max="10" className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb" {...register("systemAdmin")} onChange={(e) => setsystemAdmin(e.target.value)} value={systemAdmin} />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            bash: {bash}
            <input type="range" min="0" max="10" className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb" {...register("bash")} onChange={(e) => setbash(e.target.value)} value={bash} />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            docker: {docker}
            <input type="range" min="0" max="10" className="w-full h-2 bg-gray-200 rounded outline-none slider-thumb" {...register("docker")} onChange={(e) => setdocker(e.target.value)} value={docker} />
          </label>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={handlePrevious} className="bg-bc hover:bg-pc transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Previous
          </button>
          <button type="submit" className="bg-pc hover:bg-bc transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default DevOpsSkillsIaC;
