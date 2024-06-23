import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Roadmaps.css";
import { Helmet } from "react-helmet";
const Roadmaps = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | RoadMaps</title>
      </Helmet>
      <div className="relative">
        <div className="w-40 fixed top-64 left-3" style={{ zIndex: "100" }}>
          <NavLink to={-1} className="roadmapanimatedbutton mb-3">
            <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
              <span className="icon text-pc">
                <i className="fa-solid fa-arrow-left"></i>
              </span>
              <span className="title">Back</span>
            </li>
          </NavLink>
          <NavLink to="ourroadmaps" className="roadmapanimatedbutton mb-3">
            <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
              <span className="icon text-pc">
                <i className="fa-solid fa-bezier-curve"></i>
              </span>
              <span className="title">Our RoadMaps</span>
            </li>
          </NavLink>
          <NavLink to="yourroadmaps" className="roadmapanimatedbutton mb-3">
            <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
              <span className="icon text-pc">
                <i className="fa-solid fa-user-tie"></i>
              </span>
              <span className="title">Your RoadMaps</span>
            </li>
          </NavLink>
          <NavLink to="/roadmaps" className="roadmapanimatedbutton mb-3">
            <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
              <span className="icon text-pc">
                <i className="fa-solid fa-square-plus"></i>
              </span>
              <span className="title">Generate RoadMaps</span>
            </li>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Roadmaps;
