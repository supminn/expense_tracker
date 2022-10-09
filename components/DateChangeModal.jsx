import { useState } from "react";
import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { formatedDate } from "../utilities";

export const DateChangeModal = ({ setShowModal }) => {
  const {
    dataState: { selectedDate },
    dataDispatch,
  } = useDataContext();
  const [dateValue, setDateValue] = useState(
    formatedDate(selectedDate, "YYYY-MM-DD")
  );
  const setNewDate = () => {
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
                  Choose a Date
                </h3>
                <div className="mt-2">
                  <input
                    className="text-gray-500 border-2 p-2 rounded-md"
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={setNewDate}
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
