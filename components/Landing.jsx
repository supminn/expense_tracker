import { useUserId } from "@nhost/react";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { getExpenseData, getIncomeData } from "../services";
import { DailyReport } from "./DailyReport";
import { Header } from "./Header";
import { MonthlyReport } from "./MonthlyReport";
import { YearlyReport } from "./YearlyReport";

const routes = ["daily", "monthly", "yearly"];
export const Landing = () => {
  const [route, setRoute] = useState("daily");
  const { dataDispatch } = useDataContext();
  const userId = useUserId();

  useEffect(() => {
    (async () => {
      if (userId) {
        dataDispatch({ type: DataActions.SET_LOADER, payload: true });
        await getIncomeData(userId, dataDispatch);
        await getExpenseData(userId, dataDispatch);
        dataDispatch({ type: DataActions.SET_LOADER, payload: false });
      }
    })();
  }, [userId, dataDispatch]);
  // TODO: Add Loader
  return (
    <>
      <Header />
      <nav className="p-4 flex justify-between w-fit m-auto">
        {routes.map((value) => (
          <button
            key={value}
            onClick={() => setRoute(value)}
            className={`p-2 mx-2 rounded-md cursor-pointer capitalize ${
              route === value
                ? "bg-green-800 text-amber-200"
                : "bg-amber-200 text-green-800"
            }`}
          >
            {value}
          </button>
        ))}
      </nav>
      {route === "daily" && <DailyReport />}
      {route === "monthly" && <MonthlyReport setRoute={setRoute} />}
      {route === "yearly" && <YearlyReport setRoute={setRoute} />}
    </>
  );
};
