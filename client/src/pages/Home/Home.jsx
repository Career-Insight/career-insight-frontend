import React, { useEffect } from "react";
import Canvadots from "../../components/Canvadots/Canvadots";
import homeCSS from "./home.module.css";
import "../../images/Group5.svg";
import "../../images/Component5.png";
import { Link } from "react-router-dom";
import assetLine from "../../images/PropertyDefault.svg";
import Animationgif from "../../images/Animation.gif";
import Groupdotsfeedback from "../../images/Groupdotsfeedback.svg";
import ElisabethHyliukAvatar1 from "../../images/ElisabethHyliukAvatar1.svg";
import { Helmet } from "react-helmet";

export default function Home() {
  useEffect(() => {
    function handleScroll() {
      const assetSection = document.getElementById("assetsection");
      const assetImg = document.getElementById("assetimg");

      const assetTopOffset = assetSection.offsetTop;
      if (window.scrollY > assetTopOffset - 300) {
        assetImg.style.transform = "scaleX(1)";
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>career insight | docs</title>
      </Helmet>
      <main className={homeCSS.hero}>
        <Canvadots />
        <div className={homeCSS.hero__con}>
          <h1 className="text-5xl font-bold mb-5 text-dc">
            Career Insight: Your Personal Job GPS
          </h1>
          <p className="text-c1 font-bold mb-5">
            Unlock your career path with precision-guided navigation, customized
            insights tailored to your goals, and foresight into upcoming job
            market trends.
          </p>

          <div className={homeCSS.hero__links}>
            <Link to="/signup" className={`cta__btn ${homeCSS.cta__btn_home1}`}>
              start free <i className="fas fa-chevron-right"></i>
            </Link>
            <Link
              to="/roadmaps"
              className={`cta__btn2 ${homeCSS.cta__btn_home2}`}
            >
              free roadmaps
            </Link>
          </div>
        </div>
      </main>
      {/* /////////////////////////////////////////////// */}
      <section id="assetsection" className={`${homeCSS.asset}`}>
        <div className={`${homeCSS.asset__con}`}>
          <p className={`${homeCSS.asset__des}`}>
            Our roadmaps is for students that know — internet are their
            <span className={`${homeCSS.asset__btn} ml-2 inline-block`}>
              <a href=""> greatest asset!</a>
              <a href="">
                <img
                  id="assetimg"
                  src={assetLine}
                  className={`${homeCSS.assetline}`}
                  alt=""
                />
              </a>
            </span>
          </p>
        </div>
      </section>
      {/* /////////////////////////////////////////////// */}
      <section className={`${homeCSS.mainsec} container-fluid`}>
        <div className={`${homeCSS.maincon}`}>
          <div className={`${homeCSS.maincon__content}`}>
            <div className={`${homeCSS.maincon__hero}`}>
              <div className={`${homeCSS.maincon__heading}`}>
                <p>Welcome to Career Insight – Your Personal Job GPS!</p>
                <h2>
                  Supercharge Your Career <br /> With
                  <span> Career Insight!</span>
                </h2>
              </div>
              <p className={`${homeCSS.maincon__heading__des}`}>
                🎉 Hello there! Welcome to Career Insight – your dynamic ally in
                the ever-evolving job landscape. 🚀 We're not your average job
                finder – think of us as your trusty sidekick, your career
                superhero! 💼 Picture a world where job hunting isn't just about
                lists but about understanding exactly what companies crave. 🌟
                Ready to level up your career? Let's dive in and unlock your
                potential!
              </p>
            </div>
            <div
              className={`${homeCSS.maincon__btns} flex items-center justify- text-center`}
            >
              <a href="#" className="cta__btn mr-3" data-wow-delay="1s">
                Start Free <i className="fa-solid fa-angle-right"></i>
              </a>
              <a href="#" className="cta__btn2" data-wow-delay="1s">
                Free Roadmaps
              </a>
            </div>
          </div>
          <div className={`${homeCSS.maincon__svg}`}>
            <img src={Animationgif} alt="" />
          </div>
        </div>
      </section>
      {/* /////////////////////////////////////////////// */}
      <section className={`${homeCSS.cardssection}`}>
        <div className={`${homeCSS.cards__content} row`}>
          <div className={`${homeCSS.cards__col} col-xl-3 col-lg-4 col-md-6`}>
            <div className={`${homeCSS.cards__card}`}>
              <img
                className={`${homeCSS.cards__img}`}
                src={require("../../images/01.png")}
                alt=""
              />
              <div className={`${homeCSS.cards__div}`}>
                <h4>ROADMAPS</h4>
                <p>We are using the most advanced</p>
                <p>LMS solution (LearnDash) to</p>
                <p>provide you the best learning</p>
                <p>experience</p>
              </div>
            </div>
          </div>

          <div className={`${homeCSS.cards__col} col-xl-3 col-lg-4 col-md-6`}>
            <div className={`${homeCSS.cards__card}`}>
              <img
                className={`${homeCSS.cards__img}`}
                src={require("../../images/Figure01.png")}
                alt=""
              />
              <div className={`${homeCSS.cards__div}`}>
                <h4>CERTIFICATES</h4>
                <p>We are using the most advanced</p>
                <p>LMS solution (LearnDash) to</p>
                <p>provide you the best learning</p>
                <p>experience</p>
              </div>
            </div>
          </div>
          <div className={`${homeCSS.cards__col} col-xl-3 col-lg-4 col-md-6`}>
            <div className={`${homeCSS.cards__card}`}>
              <img
                className={`${homeCSS.cards__img}`}
                src={require("../../images/Component3.png")}
                alt=""
              />
              <div className={`${homeCSS.cards__div}`}>
                <h4>HELP & SUPPORT</h4>
                <p>We are using the most advanced</p>
                <p>LMS solution (LearnDash) to</p>
                <p>provide you the best learning</p>
                <p>experience</p>
              </div>
            </div>
          </div>
          <div className={`${homeCSS.cards__col} col-xl-3 col-lg-4 col-md-6`}>
            <div className={`${homeCSS.cards__card}`}>
              <img
                className={`${homeCSS.cards__img}`}
                src={require("../../images/Figure02.png")}
                alt=""
              />
              <div className={`${homeCSS.cards__div}`}>
                <h4>ADVANCED LMS</h4>
                <p>We are using the most advanced</p>
                <p>LMS solution (LearnDash) to</p>
                <p>provide you the best learning</p>
                <p>experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /////////////////////////////////////////////// */}
      <section className={`${homeCSS.newto}`}>
        <div className={`${homeCSS.newto__content}`}>
          <div className={`${homeCSS.newto__first}`}>
            <div className={`${homeCSS.newto__fchild}`}>
              <h4 className={`${homeCSS.newto__ftitle}`}>
                New to our website ?
              </h4>
              <div className={`${homeCSS.newto__ftext}`}>
                <p>
                  Adipisci facere ipsam excepturi quibusdam consequatur
                  laudantium. Magni odit cum et consequatur possimus. Et velit
                  animi fuga.
                </p>
                <p>
                  Fugiat recusandae adipisci est explicabo dolorem beatae beatae
                  ea quasi. At et pariatur. Nihil sed et voluptas id. Recusandae
                  magnam quas alias ipsam et alias odio.
                </p>
              </div>
              <a className="cta__btn text-center mb-4" href="">
                Start Now
              </a>
            </div>
          </div>
          <div className={`${homeCSS.newto__secound}`}></div>
        </div>
      </section>
      <section className={`${homeCSS.feedback}`}>
        <div className={`${homeCSS.feedback__title}`}>
          <div className={`${homeCSS.feedback_img__con}`}>
            <img
              className={`${homeCSS.feedback_title__img}`}
              src={Groupdotsfeedback}
              alt="dots"
            />
            <img
              className={`${homeCSS.feedback_title__img2}`}
              src={ElisabethHyliukAvatar1}
              alt="userimg"
            />
          </div>
          <div className={`${homeCSS.feedback_title__details}`}>
            <h5>nancy mohamed</h5>
            <p>alexandria university</p>
          </div>
        </div>
        <p className={`${homeCSS.feedback__des}`}>
          <span>
            <span className={`${homeCSS.feedback_des__span}`}>
              career insight
            </span>{" "}
            offers an{" "}
            <span className={`${homeCSS.feedback_des__span}`}>
              intuitive interface
            </span>
            , robust functionality, collaboration features,
          </span>
          <span>
            scalability, and reliable customer support, catering to a{" "}
            <span className={`${homeCSS.feedback_des__span}`}>
              diverse user base
            </span>{" "}
            for
          </span>
          <span>effective project management.</span>
        </p>
        <span className={`${homeCSS.feedback__line} block`}></span>
        <div className={`${homeCSS.feedback__formcon}`}>
          <p className={`${homeCSS.feedback_formcon__title}`}>
            Get in Touch <br />
            with <span>career insight</span>
          </p>
          <p className={`${homeCSS.feedback_formcon__des}`}>
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
            molestie vel, ornare non id blandit netus r eget pharetra facilis.
          </p>
          <form className={`${homeCSS.feedback_formcon__form}`}>
            <div className="form-floating  col-12 mb-3">
              <input
                type="text"
                className={`form-control`}
                id="Name"
                name="Name"
                placeholder="Name *"
              />
              <label htmlFor="Name">Name *</label>
            </div>
            <div className="form-floating  col-12 mb-3">
              <input
                type="email"
                className={`form-control`}
                id="email"
                name="email"
                placeholder="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating  col-12 mb-3">
              <input
                type="text"
                className={`form-control`}
                id="phone"
                name="phone"
                placeholder="Phone Number *"
              />
              <label htmlFor="phone">Phone Number *</label>
            </div>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
            >
              <option defaultValue>How Did You Find Us</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button
              className={`${homeCSS.feedback_formcon__btn} cta__btn w-100`}
            >
              send
            </button>
          </form>
        </div>
      </section>
      {/* /////////////////////////////////////////////// */}
    </>
  );
}
