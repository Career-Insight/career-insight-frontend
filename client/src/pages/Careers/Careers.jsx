import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CircleGauge } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import careersCSS from "./Careers.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";

async function getCompaniesNames() {
  const { data } = await axios.get(
    "http://185.69.167.185:32381/api/v1/company/get-companies-data",
    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
  );
  return data;
}

export default function Careers() {
  const { data, isLoading, error } = useQuery("companies", getCompaniesNames);

  if (isLoading || !data) {
    return (
      <div className="w-100 h-[100vh] flex justify-center items-center">
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | careers</title>
      </Helmet>
      <section className="row m-0 p-0">
        <aside className={`${careersCSS.sidebardashboard} col-md-2 col-12 p-0`}>
          <ul className="w-100 py-4 p-2 text-pc">
            main analysis
            <li className={`${careersCSS.sidebardashboard__li} w-100`}>
              <NavLink
                to="dashboard"
                className={(navData) =>
                  `${
                    navData.isActive || typeof navData.isActive === "undefined"
                      ? careersCSS.sidebardashboard__li__a1 // Use a specific style for active state
                      : careersCSS.sidebardashboard__li__a2
                  } flex items-center mt-2`
                }
              >
                {({ isActive }) => (
                  <>
                    <CircleGauge color={isActive ? "#FFFFFF" : "#000"} />
                    <div className="block hover:text-pc transition-all">
                      Dashboard
                    </div>
                  </>
                )}
              </NavLink>
            </li>
            <li className={`${careersCSS.sidebardashboard__li} w-100`}>
              <NavLink
                to="company"
                className={(navData) =>
                  `${
                    navData.isActive
                      ? careersCSS.sidebardashboard__li__a1
                      : careersCSS.sidebardashboard__li__a2
                  } flex items-center`
                }
              >
                {({ isActive }) => (
                  <>
                    <CircleGauge color={isActive ? "#FFFFFF" : "#000"} />
                    <div className="block">Company</div>
                  </>
                )}
              </NavLink>
            </li>
            corporate data analytics
            {data.slice(174).map((company, idx) => (
              <li
                key={idx}
                className={`${careersCSS.sidebardashboard__li} w-100 mt-2`}
              >
                <NavLink
                  to={`${company.company_name}`}
                  className={(navData) =>
                    `${
                      navData.isActive
                        ? careersCSS.sidebardashboard__li__a1
                        : careersCSS.sidebardashboard__li__a2
                    } flex items-center`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <CircleGauge color={isActive ? "#FFFFFF" : "#000"} />
                      <div className="block">
                        {company.company_name.split(" ").slice(0, 1).join(" ")}
                      </div>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <div className={`${careersCSS.dashcon} bg-g col-md-10 col-12 py-4`}>
          <Outlet />
        </div>
      </section>
    </>
  );
}
