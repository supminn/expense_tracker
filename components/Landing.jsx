import { useState } from "react";
import { DailyReport } from "./DailyReport";
import { Header } from "./Header";
import { MonthlyReport } from "./MonthlyReport";
import { YearlyReport } from "./YearlyReport";

export const Landing = () => {
  const [route, setRoute] = useState("daily");

  return (
    <>
      <Header />
      <nav className="p-4 flex justify-between">
        <button
          onClick={() => setRoute("daily")}
          className={`p-2 mx-2 rounded-md cursor-pointer ${
            route === "daily"
              ? "bg-green-800 text-green-200"
              : "bg-amber-200 text-green-800"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setRoute("monthly")}
          className={`p-2 mx-2 rounded-md cursor-pointer ${
            route === "monthly"
              ? "bg-green-800 text-green-200"
              : "bg-amber-200 text-green-800"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setRoute("yearly")}
          className={`p-2 mx-2 rounded-md cursor-pointer ${
            route === "yearly"
              ? "bg-green-800 text-green-200"
              : "bg-amber-200 text-green-800"
          }`}
        >
          Yearly
        </button>
      </nav>
      {route === "daily" && <DailyReport />}
      {route === "monthly" && <MonthlyReport setRoute={setRoute} />}
      {route === "yearly" && <YearlyReport setRoute={setRoute} />}
    </>
  );
};
