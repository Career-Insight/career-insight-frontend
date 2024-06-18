import React, { useContext, useState } from "react";
import Rechartcompany1 from "./../../../components/Recharts/Rechartcompany1";
import Rechartcompany2 from "./../../../components/Recharts/Rechartcompany2";
import Rechartcompany3 from "./../../../components/Recharts/Rechartcompany3";
import { Card } from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { companyNamesContext } from "./../../../context/companiesnames";

export default function Company() {
  const { companyNamesData } = useContext(companyNamesContext);
  const [selectedCompanyName, setSelectedCompanyName] = useState("IBM");

  function getCompanyNameSelect(value) {
    setSelectedCompanyName(value);
  }

  return (
    <>
      <div className="row justify-content-between mb-3">
        <div className="col-md-6 my-3">
          <Card className="p-3 h-96">
            <div className="text-lg font-bold mb-3">
              the best companies based on average ratings
            </div>
            <Rechartcompany2 />
          </Card>
        </div>
        <div className="col-md-6 my-3">
          <Card className="p-3 h-96">
            <div className="text- font-bold mb-3">
              the number of reviews per company
            </div>

            <Rechartcompany1 />
          </Card>
        </div>
      </div>
      <div className="my-3">
        <Card className="p-3">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold mb-3">
              Average rating for {selectedCompanyName}
            </div>
            <Select
              onValueChange={function (value) {
                getCompanyNameSelect(value);
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="IBM" />
              </SelectTrigger>
              <SelectContent>
                {companyNamesData.slice(174).map((company, idx) => {
                  return (
                    <SelectItem key={idx} value={company.company_name}>
                      {company.company_name.split(" ").slice(0, 1).join(" ")}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Rechartcompany3 companyname={selectedCompanyName} />
        </Card>
      </div>
    </>
  );
}
