import { useState } from "react";

const { createContext } = require("react");

export const companyNamesContext = createContext();

export function CompanyNamesProvider({ children }) {
  const [companyNamesData, setCompanyNamesData] = useState(null);
  return (
    <companyNamesContext.Provider
      value={{ setCompanyNamesData, companyNamesData }}
    >
      {children}
    </companyNamesContext.Provider>
  );
}
