import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  BarChartBig,
  Box,
  History,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Total Companies
            </CardTitle>
            <span className="block bg-purple-100 p-2 rounded-2xl">
              <Users color="#8280FF" className="w-8 h-8 text-muted-foreground" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-3">40,689</div>
            <p className="text-xs text-muted-foreground flex">
              <TrendingUp color="#00B69B" />
              <span className="text-v1 ml-2 font-bold mr-1">8.5%</span> Up from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              No. of cities
            </CardTitle>
            <span className="block bg-yellow-200 p-2 rounded-2xl">
              <Box color="#FEC53D" className="w-8 h-8 text-muted-foreground" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-3">10,293</div>
            <p className="text-xs text-muted-foreground flex">
              <TrendingUp color="#00B69B" />
              <span className="text-v1 ml-2 font-bold mr-1">1.3%</span> Up from past week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              Job titles
            </CardTitle>
            <span className="block bg-green-200 p-2 rounded-2xl">
              <BarChartBig color="#4AD991" className="w-8 h-8 text-muted-foreground" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-3">$89,000</div>
            <p className="text-xs text-muted-foreground flex">
              <TrendingDown color="#F93C65" />
              <span className="text-e1 ml-2 font-bold mr-1">4.3%</span> Down from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-gray-500 font-medium">
              No. of Reviews
            </CardTitle>
            <span className="block bg-orange-200 p-2 rounded-2xl">
              <History color="#FF9066" className="w-8 h-8 text-muted-foreground" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-3">2,040</div>
            <p className="text-xs text-muted-foreground flex">
              <TrendingUp color="#00B69B" />
              <span className="text-v1 ml-2 font-bold mr-1">1.8%</span> Up from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      
    </>
  );
}
