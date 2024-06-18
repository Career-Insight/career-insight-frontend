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
          // <Protactedroute>
          <CompanyNamesProvider>
            <Careers />
          </CompanyNamesProvider>
          // </Protactedroute>
        ),
        children: [
          { path: "", element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "company", element: <Company /> },
          { path: ":companydetails", element: <CompanyDetails /> },
        ],
      },
      {
        path: "roadmaps",
        element: (
          <Protactedroute>
            <Roadmaps />
          </Protactedroute>
        ),
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

function App() {
  const queryVar = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryVar}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
