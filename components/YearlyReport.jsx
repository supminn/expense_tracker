import { useMemo } from "react";
import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { formatedDate, monthData } from "../utilities";

export const YearlyReport = ({ setRoute }) => {
  const {
    dataState: { selectedDate },
    dataDispatch,
  } = useDataContext();

  return (
    <>
      <main>
        <section className="flex justify-around p-2 mx-2 rounded-md bg-green-800 text-green-100">
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(-1, "year"),
              })
            }
            className="fa-solid fa-arrow-left pt-1 cursor-pointer"
          ></i>
          <section>{formatedDate(selectedDate, "YYYY")}</section>
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(1, "year"),
              })
            }
            className="fa-solid fa-arrow-right pt-1 cursor-pointer"
          ></i>
        </section>
      </main>
      <section className="p-2">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700  bg-gray-50 ">
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {monthData.map((month, index) => (
              <MonthlySummary key={index} month={month} setRoute={setRoute} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

const MonthlySummary = ({ month, setRoute }) => {
  const {
    dataState: { selectedDate, incomeData: income, expenseData: expense },
    dataDispatch,
  } = useDataContext();

  const totalIncome = useMemo(
    () =>
      income
        .filter(
          (data) =>
            formatedDate(data.date, "YYYY") ===
              formatedDate(selectedDate, "YYYY") &&
            formatedDate(data.date, "MMMM") === month
        )
        .reduce((prev, curr) => prev + curr.amount, 0)
        .toFixed(2),
    [income, selectedDate, month]
  );

  const totalExpense = useMemo(
    () =>
      expense
        .filter(
          (data) =>
            formatedDate(data.date, "YYYY") ===
              formatedDate(selectedDate, "YYYY") &&
            formatedDate(data.date, "MMMM") === month
        )
        .reduce((prev, curr) => prev + curr.amount, 0)
        .toFixed(2),
    [expense, selectedDate, month]
  );

  const totalBalance = useMemo(
    () => (totalIncome - totalExpense).toFixed(2),
    [totalExpense, totalIncome]
  );

  const goToMonth = (month) => {
    const monthIndex = monthData.indexOf(month);
    dataDispatch({
      type: DataActions.SET_SELECTED_DATE,
      payload: selectedDate.month(monthIndex),
    });
    setRoute("monthly");
  };
  return (
    <tr
      className="bg-white border-b cursor-pointer hover:bg-gray-200"
      onClick={() => goToMonth(month)}
    >
      <td>{month}</td>
      <td>{totalIncome}</td>
      <td>{totalExpense}</td>
      <td>{totalBalance}</td>
    </tr>
  );
};
