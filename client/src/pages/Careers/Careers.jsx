import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { CircleGauge } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import careersCSS from "./Careers.module.css";
import { NavLink, Outlet } from "react-router-dom";
export default function Careers() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | careers</title>
      </Helmet>
      <section className="row m-0 p-0">
        <aside className={`${careersCSS.sidebardashboard} col-md-2 col-12 p-0`}>
          <ul className="w-100 h-100 py-4">
            <li className={`${careersCSS.sidebardashboard__li} w-100`}>
              <NavLink
                to="dashboard"
                className={(navData) =>
                  `flex items-center ${
                    navData.isActive
                      ? careersCSS.sidebardashboard__li__a1
                      : careersCSS.sidebardashboard__li__a2
                  } flex items-center`
                }
              >
                {({ isActive }) => (
                  <>
                    <CircleGauge color={isActive ? "#FFFFFF" : "#000"} />
                    <div className="block">Dashboard</div>
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
          </ul>
        </aside>
        <div className="bg-g col-md-10 col-12 py-4">
          <Outlet />
        </div>
      </section>
    </>
  );
}
