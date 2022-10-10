import { useMemo, useState } from "react";
import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { formatedDate } from "../utilities";
import { MonthPickerModal } from "./Modals/MonthPicker";

export const MonthlyReport = ({ setRoute }) => {
  const [showMonthPickerModal, setShowMonthPickerModal] = useState(false);
  const {
    dataState: { selectedDate, incomeData: income, expenseData: expense },
    dataDispatch,
  } = useDataContext();

  const incomeData = useMemo(
    () =>
      income.filter(
        (data) =>
          formatedDate(data.date, "MMM-YYYY") ===
          formatedDate(selectedDate, "MMM-YYYY")
      ),
    [income, selectedDate]
  );
  const expenseData = useMemo(
    () =>
      expense.filter(
        (data) =>
          formatedDate(data.date, "MMM-YYYY") ===
          formatedDate(selectedDate, "MMM-YYYY")
      ),
    [expense, selectedDate]
  );

  const dataList = useMemo(() => {
    return [
      ...new Set([
        ...incomeData.map((data) => formatedDate(data.date, "DD-MMM-YYYY")),
        ...expenseData.map((data) => formatedDate(data.date, "DD-MMM-YYYY")),
      ]),
    ].reverse();
  }, [incomeData, expenseData]);

  const gotoDate = (date) => {
    dataDispatch({ type: DataActions.SET_SELECTED_DATE, payload: date });
    setRoute("daily");
  };

  return (
    <>
      <main>
        {showMonthPickerModal && (
          <MonthPickerModal setShowModal={setShowMonthPickerModal} />
        )}
        <section className="flex justify-around p-2 mx-2 rounded-md bg-green-800 text-green-100">
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(-1, "month"),
              })
            }
            className="fa-solid fa-arrow-left pt-1 cursor-pointer"
          ></i>
          <section
            className="cursor-pointer"
            onClick={() => setShowMonthPickerModal(true)}
          >
            {formatedDate(selectedDate, "MMMM YYYY")}
          </section>
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(1, "month"),
              })
            }
            className="fa-solid fa-arrow-right pt-1 cursor-pointer"
          ></i>
        </section>
      </main>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataList.length > 0 &&
          dataList.map((date) => (
            <section
              key={date}
              className="p-2 border-2 bg-gray-200 m-2 cursor-pointer hover:bg-gray-300 hover:shadow-sm"
              onClick={() => gotoDate(date)}
            >
              <h3 className="text-center font-bold border-b-2 border-gray-400 mb-2">
                {date}
              </h3>
              <section className="flex justify-between px-2">
                <MonthlyItem
                  title="Income"
                  dataList={incomeData.filter(
                    (data) => formatedDate(data.date, "DD-MMM-YYYY") === date
                  )}
                />
                <MonthlyItem
                  title="Expense"
                  dataList={expenseData.filter(
                    (data) => formatedDate(data.date, "DD-MMM-YYYY") === date
                  )}
                />
              </section>
            </section>
          ))}
      </div>
    </>
  );
};

const MonthlyItem = ({ dataList, title }) => {
  return (
    <div className={`w-full px-1 ${title === "Expense" ? "pr-2" : "pl-2"}`}>
      <h3 className="italic text-center mb-1">{title}</h3>
      {dataList.map((data) => (
        <div key={data.id} className="flex justify-between text-sm">
          <span>{data.name}</span>
          <span>₹{data.amount}</span>
        </div>
      ))}
    </div>
  );
};
