import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Cookies from "js-cookie";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetchCompaniesReviews = async () => {
  const { data } = await axios.get(
    "http://185.69.167.185:32381/api/v1/review/best-companies/",
    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
  );
  return data;
};

const Rechartcompany2 = () => {
  const { data: companiesReviews = [] } = useQuery(
    "companiesReviews",
    fetchCompaniesReviews
  );

  const chartData = {
    labels: companiesReviews.map((item) => item._id),
    datasets: [
      {
        label: "Overall Rating",
        data: companiesReviews.map((item) => item.avg_overall_rating),
        backgroundColor: "#BEADFA",
      },
      {
        label: "Career Opportunities",
        data: companiesReviews.map((item) => item.avg_career_opportunities),
        backgroundColor: "#AAD7D9",
      },
      {
        label: "Work Life Balance",
        data: companiesReviews.map((item) => item.avg_work_life_balance),
        backgroundColor: "#CDFAD5",
      },
      {
        label: "Culture & Values",
        data: companiesReviews.map((item) => item.avg_culture_values),
        backgroundColor: "#CCC8AA",
      },
      {
        label: "Diversity & Inclusion",
        data: companiesReviews.map((item) => item.avg_diversity_inclusion),
        backgroundColor: "#F2F7A1",
      },
      {
        label: "Senior Management",
        data: companiesReviews.map((item) => item.avg_senior_management),
        backgroundColor: "#A8DF8E",
      },
      {
        label: "Compensation & Benefits",
        data: companiesReviews.map((item) => item.avg_compensation_benefits),
        backgroundColor: "#F8E559",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false, // Hide grid lines on the x-axis
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines on the y-axis
        },
        ticks: {
          callback: function (value) {
            if (value % 1 === 0) {
              return value; // Only display whole numbers
            }
          },
          stepSize: 1, // Ensure steps are in whole numbers
        },
      },
    },
    animation: {
      duration: 1000, // Duration of the animation in milliseconds
    },
    plugins: {
      legend: {
        position: "right", // Position of the legend
        align: "start", // Alignment of the legend
        labels: {
          boxWidth: 20, // Width of the legend box
          boxHeight: 10, // Height of the legend box
          padding: 10, // Padding around the legend items
        },
      },
      tooltip: {
        position: "nearest", // Position of the tooltip
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
      },
    },
  };

  if (companiesReviews.length === 0) {
    return (
      <div className="w-100 h-100 flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#323efb"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return <Bar data={chartData} options={options} />;
};

export default Rechartcompany2;
