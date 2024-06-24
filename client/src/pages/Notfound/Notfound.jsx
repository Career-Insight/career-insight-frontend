import React, { useState, useEffect } from "react";
import "./Notfound.css"; // Make sure to import the CSS file
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Notfound() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const toggleTheme = () => {
    const root = document.documentElement;

    if (currentTheme === "dark") {
      root.style.setProperty("--bg-color", "#fff");
      root.style.setProperty("--text-color", "#000");
      setCurrentTheme("light");
    } else {
      root.style.setProperty("--bg-color", "#050505");
      root.style.setProperty("--text-color", "#fff");
      setCurrentTheme("dark");
    }
  };

  useEffect(() => {
    const colorSwitcher = document.querySelector("[data-theme-color-switch]");
    if (colorSwitcher) {
      colorSwitcher.textContent =
        currentTheme === "dark" ? "\u{2600}" : "\u{1F319}";
    }
  }, [currentTheme]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | NotFound Page</title>
      </Helmet>{" "}
      <main className="error-page">
        <div className="containereye">
          <div className="eyes">
            <div className="eye">
              <div className="eye__pupil eye__pupil--left"></div>
            </div>
            <div className="eye">
              <div className="eye__pupil eye__pupil--right"></div>
            </div>
          </div>

          <div className="error-page__heading">
            <h1 className="error-page__heading-title">
              Looks like you're lost
            </h1>
            <p className="error-page__heading-desciption">404 error</p>
          </div>

          <Link
            to="/home"
            className="error-page__button"
            aria-label="back to home"
            title="back to home"
          >
            back to home
          </Link>
        </div>
      </main>
    </>
  );
}
