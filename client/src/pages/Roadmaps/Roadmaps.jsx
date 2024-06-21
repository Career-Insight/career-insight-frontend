import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Roadmaps.css";
const Roadmaps = () => {
  return (
    <div className="relative">
      <div className="w-40 fixed top-36 left-3">
        <NavLink to='ourroadmaps' className="roadmapanimatedbutton mb-3">
          <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
            <span className="icon text-pc"><i className="fa-solid fa-bezier-curve"></i></span>
            <span className="title">Our RoadMaps</span>
          </li>
        </NavLink>
        <ul className="roadmapanimatedbutton mb-3">
          <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
            <span className="icon text-pc"><i className="fa-solid fa-bezier-curve"></i></span>
            <span className="title">Our RoadMaps</span>
          </li>
        </ul>
        <ul className="roadmapanimatedbutton mb-3">
          <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
            <span className="icon text-pc"><i className="fa-solid fa-bezier-curve"></i></span>
            <span className="title">Our RoadMaps</span>
          </li>
        </ul>
        <ul className="roadmapanimatedbutton mb-3">
          <li style={{ "--i": "#323efb", "--j": "#edf3f9" }}>
            <span className="icon text-pc"><i className="fa-solid fa-bezier-curve"></i></span>
            <span className="title">Our RoadMaps</span>
          </li>
        </ul>
        
      </div>
      <Outlet />
    </div>
  );
};

export default Roadmaps;
