import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fetch function using axios
const fetchCompanyDetails = async (companydetails) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/v1/company/get-company?company_name=${companydetails}`,
    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
  );
  return data;
};

export default function CompanyDetails() {
  let { companydetails } = useParams();

  // Using useQuery to fetch data
  const { data, error, isLoading } = useQuery(
    ["companyDetails", companydetails],
    () => fetchCompanyDetails(companydetails)
  );

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
  console.log(data);

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
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
                className="w-full h-full object-cover"
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
                    <i class="text-2xl mr-2 text-pc far fa-sad-cry"></i> No
                    social media links available
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl  flex w-full  font-medium mb-3">
            <i class="text-3xl mr-2 text-pc fas fa-search"></i> Popular Careers
            with {data.company_name} Job Seekers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="slider-container">
            <Slider {...settings}>
              {data.Popular_Careers.map((career, index) => {
                return (
                  <div key={index} className="h-[120px] px-2">
                    <div className="h-full p-3 flex flex-col justify-between border border-gray-500 rounded-md">
                      <h3 className="text-xl text-pc font-medium">{career}</h3>
                      <p className="text-gray-500">
                        <span>Job</span> . <span>Salaries</span> .{" "}
                        <span>Interveiws</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
