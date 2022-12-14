import { useUserId } from "@nhost/react";
import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";
import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { deleteItem } from "../services";
import { formatedDate } from "../utilities";
import { DateChangeModal } from "./Modals/DateChange";
import { InputModal } from "./Modals/Input";

export const DailyReport = () => {
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const dataRef = useRef({});
  const {
    dataState: { selectedDate, incomeData: income, expenseData: expense },
    dataDispatch,
  } = useDataContext();
  const userId = useUserId();
  const [isToday, monthYear, date] = useMemo(() => {
    return [
      formatedDate(dayjs()) === formatedDate(selectedDate),
      formatedDate(selectedDate, "MMM-YY"),
      formatedDate(selectedDate, "DD"),
    ];
  }, [selectedDate]);

  const incomeData = useMemo(
    () =>
      income.filter(
        (data) => formatedDate(data.date) === formatedDate(selectedDate)
      ),
    [income, selectedDate]
  );

  const expenseData = useMemo(
    () =>
      expense.filter(
        (data) => formatedDate(data.date) === formatedDate(selectedDate)
      ),
    [expense, selectedDate]
  );

  const totalIncome = useMemo(
    () => incomeData.reduce((prev, curr) => (prev += curr.amount), 0),
    [incomeData]
  );

  const totalExpense = useMemo(
    () => expenseData.reduce((prev, curr) => (prev += curr.amount), 0),
    [expenseData]
  );

  const balance = useMemo(
    () =>
      income
        .filter((data) => selectedDate.diff(data.date, "hour") >= 0)
        .reduce((prev, curr) => prev + curr.amount, 0) -
      expense
        .filter((data) => selectedDate.diff(data.date, "hour") >= 0)
        .reduce((prev, curr) => prev + curr.amount, 0),
    [income, expense, selectedDate]
  );

  const addNewEntry = () => {
    dataRef.current = {
      route: "expense",
      name: "",
      amount: "",
      description: "",
    };
    setShowInputModal(true);
  };

  const editRecord = (data) => {
    dataRef.current = data;
    setShowInputModal(true);
  };

  const removeRecord = async (data) => {
    await deleteItem(data, userId, dataDispatch);
  };

  return (
    <div className="min-h-content h-full relative">
      <main>
        {showDatePickerModal && (
          <DateChangeModal setShowModal={setShowDatePickerModal} />
        )}
        <section className="flex justify-around p-2 mx-2 rounded-md bg-green-800 text-green-100">
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(-1, "day"),
              })
            }
            className="fa-solid fa-arrow-left pt-1 cursor-pointer"
          ></i>
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
          <span>
            Balance: ???
            <span className={`${balance < 0 ? "text-red-300" : ""}`}>
              {balance.toFixed(2)}
            </span>
          </span>
          <i
            onClick={() =>
              dataDispatch({
                type: DataActions.SET_SELECTED_DATE,
                payload: selectedDate.add(1, "day"),
              })
            }
            className="fa-solid fa-arrow-right pt-1 cursor-pointer"
          ></i>
        </section>
        <section className="md:grid md:grid-cols-2">
          <div className="bg-green-100 m-2 rounded-md">
            <div className="flex justify-between p-2 m-2 mb-0 border-b-2 border-green-600">
              <h3 className="text-lg">Income</h3>
              <span>???{totalIncome.toFixed(2)}</span>
            </div>
            <div className="p-4 overflow-y-scroll max-h-64 md:max-h-full md:overflow-y-auto">
              <DataItems
                list={incomeData}
                editRecord={editRecord}
                removeRecord={removeRecord}
              />
            </div>
          </div>
          <div className="bg-amber-100 m-2 rounded-md">
            <div className="flex justify-between p-2 m-2 mb-0 border-b-2 border-amber-600">
              <h3 className="text-lg">Expense</h3>
              <span>???{totalExpense.toFixed(2)}</span>
            </div>
            <div className="p-4 overflow-y-scroll max-h-64 md:max-h-full md:overflow-y-auto">
              <DataItems
                list={expenseData}
                editRecord={editRecord}
                removeRecord={removeRecord}
              />
            </div>
          </div>
        </section>
      </main>
      <button
        onClick={addNewEntry}
        className="bg-green-900 text-green-100 p-3 px-4 md:p-4 md:px-5 rounded-full absolute right-2 bottom-2 lg:right-6 cursor-pointer hover:shadow-xl"
      >
        <i className="fa-solid fa-add"></i>
      </button>
      {showInputModal && (
        <InputModal
          setShowModal={setShowInputModal}
          initialData={dataRef.current}
        />
      )}
    </div>
  );
};

const DataItems = ({ list, editRecord, removeRecord }) => {
  const [descId, setDescId] = useState("");

  const showDescription = (data) => {
    if (data.id === descId || data.description === "") {
      setDescId("");
    } else {
      setDescId(data.id);
    }
  };

  return list.length > 0 ? (
    list.map((data) => (
      <section
        key={data.id}
        className={`py-2 first:pt-0 border-b-2 ${
          data.route === "expense" ? "border-amber-200" : "border-green-200"
        } last:border-0 last:pb-0`}
      >
        <div className="flex justify-between ">
          <span>
            {data.name}{" "}
            {data.description && (
              <i
                onClick={() => showDescription(data)}
                className="fa-solid fa-notes-medical ml-2 cursor-pointer"
              ></i>
            )}
          </span>
          <div>
            <span onClick={() => editRecord(data)} className="cursor-pointer">
              ???{data.amount.toFixed(2)}
            </span>
            <i
              onClick={() => removeRecord(data)}
              className="fa-solid fa-trash pl-2 text-red-700 cursor-pointer"
            ></i>
          </div>
        </div>
        {descId === data.id && (
          <div className="italic text-sm">{data.description}</div>
        )}
      </section>
    ))
  ) : (
    <div>
      Click on <i className="fa-solid fa-add"></i> to add new value
    </div>
  );
};
