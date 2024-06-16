import React, { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { BallTriangle } from "react-loader-spinner";
export default function Canvadots() {
  const [init, setInit] = useState(false);
  const particlesInit = useRef(false); // useRef to track initialization state

  useEffect(() => {
    if (!particlesInit.current) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
        particlesInit.current = true; // set to true after initialization
      });
    }
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };
  if (!init || !particlesInit.current) {
    return (
      <div className="w-100 h-[100vh] bg-wc z-50 flex justify-center items-center fixed top-0 left-0">
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
      <Particles
        init={init}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fullScreen: false,
          fpsLimit: 120,
          interactivity: {
            events: {
              //  onClick: {
              //     enable: true,
              //     mode: "push",
              //   },
              // onHover: {
              //   enable: true,
              //   mode: "repulse",
              // },
              resize: true,
            },
            modes: {
              push: {
                quantity: 80,
              },
              repulse: {
                distance: 200,
                duration: 1,
              },
            },
          },
          particles: {
            color: {
              value: "#323EFB",
            },
            links: {
              color: "#323EFB",
              distance: 150,
              enable: true,
              opacity: 0.8,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 500,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </>
  );
}
