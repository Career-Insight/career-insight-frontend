import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Careers from "./pages/Careers/Careers";
import Roadmaps from "./pages/Roadmaps/Roadmaps";
import Aboutus from "./pages/Aboutus/Aboutus";
import Faqs from "./pages/Faqs/Faqs";
import Notfound from "./pages/Notfound/Notfound";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Verification from "./pages/Verification/Verification";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/authentication";
import Protactedroute from "./components/Protactedroute/Protactedroute";
import Dashboard from "./pages/Careers/Dashboard/Dashboard";
import Company from "./pages/Careers/Company/Company";
import { QueryClient, QueryClientProvider } from "react-query";
import CompanyDetails from "./pages/Careers/CompanyDetails/CompanyDetails";
import { CompanyNamesProvider } from "./context/companiesnames";
import { useState } from "react";
import FirstMainQ from "./components/Steps/FristMainQ";
import { Toaster } from "react-hot-toast";
import SecondMainQ from "./components/Steps/SecondMainQ";
import DataScienceStep1 from "./components/Steps/DataSciencePath/DataScienceStep1";
import DataScienceStep2 from "./components/Steps/DataSciencePath/DataScienceStep2";
import DataScienceStep3 from "./components/Steps/DataSciencePath/DataScienceStep3";
import DataScienceStep4 from "./components/Steps/DataSciencePath/DataScienceStep4";
import DataScienceStep5 from "./components/Steps/DataSciencePath/DataScienceStep5";
import Summary from "./components/Steps/Summary";
import OurRoadMaps from "./pages/Roadmaps/OurRoadMaps/OurRoadMaps";
import RoadMapsGraph from "./components/RoadMapsGraph/RoadMapsGraph";
import YourSavedRoadMaps from "./pages/Roadmaps/YourSavedRoadMaps/YourSavedRoadMaps";
import RoadMapsGraph2 from "./components/RoadMapsGraph/RoadMapsGraph2";
import BackEndStep1 from "./components/Steps/BackEndPath/BackEndStep1";
import BackEndStep2 from "./components/Steps/BackEndPath/BackEndStep2";
import BackEndSkillsSpringBoot from "./components/Steps/BackEndPath/BackEndSkillsSpringBoot";
import BackEndSkillsFlask from "./components/Steps/BackEndPath/BackEndSkillsFlask";
import BackEndSkillsDjango from "./components/Steps/BackEndPath/BackEndSkillsDjango";
import BackEndSkillsNodeJS from "./components/Steps/BackEndPath/BackEndSkillsNodeJS";
import BackEndSkillsPHP from "./components/Steps/BackEndPath/BackEndSkillsPHP";

function App() {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          reason: "",
          path: "",
          dataScience: {
            option: "",
            learnFundamentalsR: "",
            learnDataWrangling: "",
            learnFundamentalsWrangling: "",
            dataWranglingSkills: {
              dataManipulation: 0,
              statisticalModeling: 0,
              visualization: 0,
              programming: 0,
            },
            rSkills: {
              dataManipulation: "",
              statisticalModeling: "",
              visualization: "",
              programming: "",
            },
          },
          backEnd: {
            framework: "",
            needRefresher: "",
            skills: {
              dataManipulation: 0,
              statisticalModeling: 0,
              visualization: 0,
              programming: 0,
            },
          },
          frontEnd: {
            framework: "",
          },
          devOps: {
            option: "",
          },
        };
  });

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "docs",
          element: <Home />,
        },
        {
          path: "careers",
          element: (
            <Protactedroute>
              <CompanyNamesProvider>
                <Careers />
              </CompanyNamesProvider>
            </Protactedroute>
          ),
          children: [
            { path: "", element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "company", element: <Company /> },
            { path: ":companydetails", element: <CompanyDetails /> },
          ],
        },
        {
          path: "roadMaps",
          element: (
            // <Protactedroute>
            <Roadmaps />
            // </Protactedroute>
          ),
          children: [
            {
              path: "",
              element: (
                <FirstMainQ formData={formData} setFormData={setFormData} />
              ),
            },
            {
              path: "first-main-q",
              element: (
                <FirstMainQ formData={formData} setFormData={setFormData} />
              ),
            },
            {
              path: "second-main-q",
              element: (
                <SecondMainQ formData={formData} setFormData={setFormData} />
              ),
            },
            {
              path: "dataScienceStep1",
              element: (
                <DataScienceStep1
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "dataScienceStep2",
              element: (
                <DataScienceStep2
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "dataScienceStep3",
              element: (
                <DataScienceStep3
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "dataScienceStep4",
              element: (
                <DataScienceStep4
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "dataScienceStep5",
              element: (
                <DataScienceStep5
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "backEndStep1",
              element: (
                <BackEndStep1 formData={formData} setFormData={setFormData} />
              ),
            },
            {
              path: "backEndStep2",
              element: (
                <BackEndStep2 formData={formData} setFormData={setFormData} />
              ),
            },
            {
              path: "backEndSkillsSpringBoot",
              element: (
                <BackEndSkillsSpringBoot
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "backEndSkillsFlask",
              element: (
                <BackEndSkillsFlask
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "backEndSkillsDjango",
              element: (
                <BackEndSkillsDjango
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "backEndSkillsNodeJS",
              element: (
                <BackEndSkillsNodeJS
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "backEndSkillsPHP",
              element: (
                <BackEndSkillsPHP
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            { path: "summary", element: <Summary formData={formData} /> },
            { path: "ourroadmaps", element: <OurRoadMaps /> },
            { path: "yourroadmaps", element: <YourSavedRoadMaps /> },
            {
              path: "savestaticroadmap/:roadmapsgraph",
              element: <RoadMapsGraph />,
            },
            {
              path: "deletestaticroadmap/:roadmapsgraph2",
              element: <RoadMapsGraph2 />,
            },
          ],
        },
        {
          path: "aboutus",
          element: <Aboutus />,
        },
        {
          path: "faqs",
          element: <Faqs />,
        },
        {
          path: "profile",
          element: (
            <Protactedroute>
              <Profile />
            </Protactedroute>
          ),
        },
      ],
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "verification/:email",
      element: <Verification />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  const queryVar = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryVar}>
          <RouterProvider router={router} />
          <Toaster position="bottom-center" />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
