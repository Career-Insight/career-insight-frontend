import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BallTriangle } from "react-loader-spinner";
import { Ban } from "lucide-react";
import Slider from "react-slick";
import ProgressBar from "react-bootstrap/ProgressBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import companyDetaildCSS from "./CompanyDetails.module.css";
// Fetch function using axios
const fetchCompanyDetails = async (companydetails) => {
  const { data } = await axios.get(
    `https://career-insight.me/api/v1/company/get-company?company_name=${companydetails}`,
    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
  );
  return data;
};

export default function CompanyDetails() {
  let { companydetails } = useParams();
  const [positive, setPositive] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [negative, setNegative] = useState(0);
  // Using useQuery to fetch data
  const { data, isLoading } = useQuery(["companyDetails", companydetails], () =>
    fetchCompanyDetails(companydetails)
  );

  useEffect(() => {
    const handleScroll = () => {
      const progbar = document.getElementById("progbar");
      if (progbar) {
        const progbarTop = progbar.offsetTop;
        const windowTop = window.scrollY;
        if (windowTop > progbarTop - 60) {
          setPositive(data.Interviews.Experience.Positive || 0);
          setNeutral(data.Interviews.Experience.Neutral || 0);
          setNegative(data.Interviews.Experience.Negative || 0);
        }
      }
    };

    if (data && data.Interviews && data.Interviews.Experience) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, negative, neutral, positive]); // eslint-disable-line

  // Handling loading state
  if (isLoading) {
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

  let settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (typeof data.Company_url === "undefined" || data.Company_url === null) {
    return (
      <div className="w-100 h-100 flex justify-center items-center">
        <div className="flex">
          <Ban color={"red"} />
          There Is No Data For this Company Yet
        </div>
      </div>
    );
  }

  return (
    <>
      <Card className="mb-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm flex w-full  font-medium">
            <div className="w-[150px] h-[150px]">
              <img
                className="w-full h-full object-contain"
                src={data.og_image}
                alt={`${data.company_name} logo`}
              />
            </div>
            <div className="w-full p-3">
              <h1 className="text-3xl text-pc mb-2">{data.company_name}</h1>
              <a
                href={`https://${data.Company_url}`}
                className="text-lg text-bc hover:text-pc underline transition-all mb-2 block"
              >
                {data.Company_url}
              </a>
              <p className="text-gray-500">{data.description}</p>
              <p className="text-sm font-medium mt-2">
                {data.rate} <i className="fas fa-star text-yellow-400"></i>
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 row">
            <p className="text-sm font-medium p-2 col-md-6">
              <i className="text-2xl mr-2 text-pc fa-solid fa-industry"></i>
              {data.Industry}
            </p>
            <p className="text-sm font-medium p-2 col-md-6">
              <i className="text-2xl mr-2 text-pc fa-solid fa-quote-right"></i>
              {data.Type}
            </p>
            <p className="text-sm font-medium p-2 col-md-6">
              <i className="text-2xl mr-2 text-pc fas fa-search-dollar"></i>
              {data.Revenue}
            </p>
            <p className="text-sm font-medium p-2 col-md-6">
              <i className="text-2xl mr-2 text-pc fa-solid fa-code-branch"></i>
              {data.Num_Branches}
            </p>
            <p className="text-sm font-medium p-2 col-md-6">
              <i className="text-2xl mr-2 text-pc fas fa-user"></i>
              {data.Size}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Social Media Links:</h2>
            <ul>
              {data.Social_Media_Links.length > 0 ? (
                data.Social_Media_Links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bc hover:text-pc transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <i className="text-2xl mr-2 text-pc far fa-sad-cry"></i> No
                    social media links available
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card id="progbar" className="mb-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl  flex w-full  font-medium mb-3">
            <i className="text-3xl mr-2 text-pc fas fa-search"></i> Popular
            Careers with {data.company_name} Job Seekers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="slider-container">
            <Slider {...settings}>
              {data.Popular_Careers.map((career, index) => {
                return (
                  <div key={index} className="h-28 md:h-40 px-2">
                    <div className="p-3 h-full flex flex-col justify-between border border-gray-500 rounded-md">
                      <h3 className="text-xl text-pc font-medium">{career}</h3>
                      <p className="text-gray-500">
                        <span>Job</span> . <span>Salaries</span> .{" "}
                        <span>Interviews</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl  flex w-full  font-medium mb-3">
            <i className="text-3xl mr-2 text-pc fas fa-microphone"></i>
            interviews at {data.company_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lowercase mb-4">
            <span
              className={`text-6xl font-medium ${
                data.Interviews.Difficulty > 2
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {data.Interviews.Difficulty}
            </span>
            <span className="text-pc text-2xl">
              <span className="p-2 rounded-lg bg-gray-400">/5</span>{" "}
              difficulty&#174;
            </span>
          </div>
          <div className="mt-2 mb-2 row">
            <div className="col-md-6">
              <div className="relative">
                <h4 className="text-2xl flex w-full font-medium mb-2">
                  interview experience :
                </h4>
                <p className="absolute top-[100%]  left-0 font-medium">
                  <span className="text-green-500 text-xl font-medium">
                    {positive}%
                  </span>{" "}
                  Positive
                </p>
                <p className="absolute top-[100%] right-0 font-medium">
                  Negative{" "}
                  <span className="text-red-500 text-xl font-medium">
                    {negative}%
                  </span>
                </p>
                <ProgressBar className="h-10 ">
                  <ProgressBar
                    animated
                    striped
                    className="bg-blue-500 text-sm font-medium"
                    // variant="success"
                    now={positive}
                    key={1}
                    min={0}
                    max={100}
                  />
                  <ProgressBar
                    animated
                    className="bg-gray-500 text-sm font-medium"
                    // variant="warning"
                    now={neutral}
                    label={`Neutral ${`${neutral}%`}`}
                    key={2}
                    min={0}
                    max={100}
                  />
                  <ProgressBar
                    animated
                    striped
                    className="bg-red-500 text-sm font-medium"
                    // variant="danger"
                    now={negative}
                    key={3}
                    min={0}
                    max={100}
                  />
                </ProgressBar>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <h4 className="text-2xl flex w-full font-medium mb-2">
                  How other got an interview at {data.company_name} :
                </h4>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="mr-2 text-gray-600 text-lg w-[40%]">
                      <span>
                        {data.Interviews.Getting_an_Interview.Applied_online ||
                          "0%"}
                      </span>{" "}
                      Applied online
                    </h4>
                    <ProgressBar className="h-5 w-[60%]">
                      <ProgressBar
                        className="bg-bc text-sm font-medium"
                        now={
                          data.Interviews.Getting_an_Interview.Applied_online
                            ? Number(
                                data.Interviews.Getting_an_Interview.Applied_online.split(
                                  "%"
                                )
                                  .slice(0, 1)
                                  .join(" ")
                              )
                            : 0
                        }
                        key={1}
                        min={0}
                        max={100}
                      />
                    </ProgressBar>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="mr-2 text-gray-600 text-lg w-[40%]">
                      <span>
                        {data.Interviews.Getting_an_Interview
                          .Campus_Recruiting || "0%"}
                      </span>{" "}
                      Campus Recruiting
                    </h4>
                    <ProgressBar className="h-5 w-[60%]">
                      <ProgressBar
                        className="bg-bc text-sm font-medium"
                        now={
                          data.Interviews.Getting_an_Interview.Campus_Recruiting
                            ? Number(
                                data.Interviews.Getting_an_Interview.Campus_Recruiting.split(
                                  "%"
                                )
                                  .slice(0, 1)
                                  .join(" ")
                              )
                            : 0
                        }
                        key={1}
                        min={0}
                        max={100}
                      />
                    </ProgressBar>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="mr-2 text-gray-600 text-lg w-[40%]">
                      <span>
                        {data.Interviews.Getting_an_Interview.Recruiter || "0%"}
                      </span>{" "}
                      Recruiter
                    </h4>
                    <ProgressBar className="h-5 w-[60%]">
                      <ProgressBar
                        className="bg-bc text-sm font-medium"
                        now={
                          data.Interviews.Getting_an_Interview.Recruiter
                            ? Number(
                                data.Interviews.Getting_an_Interview.Recruiter.split(
                                  "%"
                                )
                                  .slice(0, 1)
                                  .join(" ")
                              )
                            : 0
                        }
                        key={1}
                        min={0}
                        max={100}
                      />
                    </ProgressBar>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="mr-2 text-gray-600 text-lg w-[40%]">
                      <span>
                        {data.Interviews.Getting_an_Interview
                          .Employee_Referral || "0%"}
                      </span>{" "}
                      Employee Referral
                    </h4>
                    <ProgressBar className="h-5 w-[60%]">
                      <ProgressBar
                        className="bg-bc text-sm font-medium"
                        now={
                          data.Interviews.Getting_an_Interview.Employee_Referral
                            ? Number(
                                data.Interviews.Getting_an_Interview.Employee_Referral.split(
                                  "%"
                                )
                                  .slice(0, 1)
                                  .join(" ")
                              )
                            : 0
                        }
                        key={1}
                        min={0}
                        max={100}
                      />
                    </ProgressBar>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="mr-2 text-gray-600 text-lg w-[40%]">
                      <span>
                        {data.Interviews.Getting_an_Interview.in_person || "0%"}
                      </span>{" "}
                      In Person
                    </h4>
                    <ProgressBar className="h-5 w-[60%]">
                      <ProgressBar
                        className="bg-bc text-sm font-medium"
                        now={
                          data.Interviews.Getting_an_Interview.in_person
                            ? Number(
                                data.Interviews.Getting_an_Interview.in_person
                                  .split("%")
                                  .slice(0, 1)
                                  .join(" ")
                              )
                            : 0
                        }
                        key={1}
                        min={0}
                        max={100}
                      />
                    </ProgressBar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
