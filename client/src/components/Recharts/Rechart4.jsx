import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function Rechart4() {
  const [jobByCountry, setjobByCountry] = useState([]);

  useEffect(() => {
    jobByCountryCalling();
  }, []);

  async function jobByCountryCalling() {
    try {
      const { data } = await axios.get(
        "https://career-insight.me/api/v1/dashboard/general/programming-languages/10",
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      setjobByCountry(data);
    } catch (error) {
      console.log("error", error);
    }
  }
  const labels = jobByCountry.map((item) => item.k);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: jobByCountry.map((item) => item.v),
        backgroundColor: ["#357AF6"],
        borderColor: ["#357AF6"],
        borderWidth: 1,
        barThickness: 15, // Set the bar thickness here
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "92%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
