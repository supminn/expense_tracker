import localeData from "dayjs/plugin/localeData";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useDataContext } from "../../context/dataContext";
import { DataActions } from "../../reducer/actions";
import { formatedDate } from "../../utilities";

dayjs.extend(localeData);
const monthData = dayjs.months();

export const MonthPickerModal = ({ setShowModal }) => {
  const {
    dataState: { selectedDate },
    dataDispatch,
  } = useDataContext();
  const [dateValue, setDateValue] = useState(selectedDate);
  const setNewMonth = () => {
    dataDispatch({ type: DataActions.SET_SELECTED_DATE, payload: dateValue });
    setShowModal(false);
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-x-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-xl font-bold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {formatedDate(dateValue, "MMMM")},{" "}
                  {formatedDate(dateValue, "YYYY")}
                </h3>
                <section className="flex justify-around p-1 font-semibold rounded-md bg-gray-200 text-green-800">
                  <i
                    onClick={() => setDateValue(dateValue.add(-1, "year"))}
                    className="fa-solid fa-arrow-left pt-1 cursor-pointer"
                  ></i>
                  <section
                    className="cursor-pointer"
                    onClick={() => setShowDatePickerModal(true)}
                  >
                    {formatedDate(dateValue, "YYYY")}
                  </section>
                  <i
                    onClick={() => setDateValue(dateValue.add(1, "year"))}
                    className="fa-solid fa-arrow-right pt-1 cursor-pointer"
                  ></i>
                </section>
                <div className="mt-2">
                  {monthData.map((month, index) => (
                    <button
                      key={index}
                      onClick={() => setDateValue(dateValue.month(index))}
                      className={`p-2 m-2 rounded-md cursor-pointer ${
                        month === formatedDate(dateValue, "MMMM")
                          ? "bg-green-800 text-amber-200"
                          : "bg-amber-200 text-green-800"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={setNewMonth}
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
