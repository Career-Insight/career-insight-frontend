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
import DataScienceStep4 from "./components/Steps/DataSciencePath/DataScienceStep4";
import Summary from "./components/Steps/Summary";
import OurRoadMaps from "./pages/Roadmaps/OurRoadMaps/OurRoadMaps";
import RoadMapsGraph from "./components/RoadMapsGraph/RoadMapsGraph";
import YourSavedRoadMaps from "./pages/Roadmaps/YourSavedRoadMaps/YourSavedRoadMaps";
import RoadMapsGraph2 from "./components/RoadMapsGraph/RoadMapsGraph2";

function App() {
  const [formData, setFormData] = useState({
    reason: "",
    path: "",
    dataScience: {
      option: "",
      learnFundamentalsR: "",
      learnDataWrangling: "",
      rSkills: {
        dataManipulation: "",
        statisticalModeling: "",
        visualization: "",
        programming: "",
      },
      dataWranglingSkills: {
        cleaning: "",
        transformation: "",
        merging: "",
        aggregation: "",
      },
    },
    backEnd: {
      framework: "",
    },
    frontEnd: {
      framework: "",
    },
    devOps: {
      option: "",
    },
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
              path: "dataScienceStep4",
              element: (
                <DataScienceStep4
                  formData={formData}
                  setFormData={setFormData}
                />
              ),
            },
            {
              path: "summary",
              element: <Summary formData={formData} />,
            },
            {
              path: "ourroadmaps",
              element: <OurRoadMaps />,
            },
            {
              path: "yourroadmaps",
              element: <YourSavedRoadMaps />,
            },
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
        {
          path: "*",
          element: <Notfound />,
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
