import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useDataContext } from "../context/dataContext";
import { formatedDate } from "../utilities";
import { DateChangeModal } from "./DateChangeModal";
import { Header } from "./Header";
import { InputModal } from "./InputModal";

export const Landing = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const {
    dataState: { selectedDate, balance, incomeData, expenseData },
  } = useDataContext();

  const isToday = useMemo(() => {
    if (formatedDate(dayjs()) === formatedDate(selectedDate)) {
      return true;
    }
    return false;
  }, [selectedDate]);

  const monthYear = formatedDate(selectedDate, "MMM-YY");
  const date = formatedDate(selectedDate, "DD");
  const totalIncome = incomeData.reduce(
    (prev, curr) => (prev += curr.amount),
    0
  );
  const totalExpense = expenseData.reduce(
    (prev, curr) => (prev += curr.amount),
    0
  );

  return (
    <>
      <Header />
      <nav className="p-4 flex justify-between">
        <button className="p-2 mx-2 rounded-md bg-green-800 text-green-100 cursor-pointer">
          Daily
        </button>
        <button className="p-2 mx-2 rounded-md bg-amber-200 text-green-800 cursor-pointer">
          Monthly
        </button>
        <button className="p-2 mx-2 rounded-md bg-amber-200 text-green-800 cursor-pointer">
          Yearly
        </button>
      </nav>
      <main>
        {showDatePickerModal && (
          <DateChangeModal setShowModal={setShowDatePickerModal} />
        )}
        <section className="flex justify-around p-2 mx-2 rounded-md bg-green-800 text-green-100">
          <i className="fa-solid fa-arrow-left pt-1 cursor-pointer"></i>
          <section
            className="cursor-pointer"
            onClick={() => setShowDatePickerModal(true)}
          >
            <span
              className={`${
                isToday
                  ? "border-b-green-100 border-2 p-1 rounded-md mr-1"
                  : "mr-1"
              }`}
            >
              {date}
            </span>
            <span>{monthYear}</span>
          </section>
          <span>Balance: ₹{balance.toFixed(2)}</span>
          <i className="fa-solid fa-arrow-right pt-1 cursor-pointer"></i>
        </section>
        <section className="pt-2">
          <div className="bg-green-100 m-2 rounded-md">
            <div className="flex justify-between p-2 m-2 mb-0 border-b-2 border-green-600">
              <h3 className="text-lg">Income</h3>
              <span>₹{totalIncome.toFixed(2)}</span>
            </div>
            <div className="p-4">
              Click on <i className="fa-solid fa-add"></i> to add new value
            </div>
          </div>
          <div className="bg-red-100 m-2 rounded-md">
            <div className="flex justify-between p-2 m-2 mb-0 border-b-2 border-red-600">
              <h3 className="text-lg">Expense</h3>
              <span>₹{totalExpense.toFixed(2)}</span>
            </div>
            <div className="p-4">
              Click on <i className="fa-solid fa-add"></i> to add new value
            </div>
          </div>
        </section>
      </main>
      <button
        onClick={() => setShowInputModal(true)}
        className="bg-green-900 text-green-100 p-4 px-5 rounded-full fixed bottom-32 right-6 cursor-pointer hover:shadow-xl"
      >
        <i className="fa-solid fa-add"></i>
      </button>
      {showInputModal && <InputModal setShowModal={setShowInputModal} />}
    </>
  );
};
