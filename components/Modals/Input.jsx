import { useUserId } from "@nhost/react";
import { useState } from "react";
import { useDataContext } from "../../context/dataContext";
import { addNewItem, updateItem } from "../../services";

export const InputModal = ({ setShowModal, initialData }) => {
  const {
    dataState: { selectedDate },
    dataDispatch,
  } = useDataContext();
  const userId = useUserId();
  const [data, setData] = useState(initialData);

  const setDataHandler = (tag, value) => {
    setData((data) => ({ ...data, [tag]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const item = {
      ...data,
      date: selectedDate,
      amount: Number(data.amount),
    };
    if (data.id) {
      updateItem(item, userId, dataDispatch);
    } else {
      addNewItem(item, userId, dataDispatch);
    }
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

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form
            onSubmit={submitHandler}
            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-xl font-bold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Add Data
                </h3>
                <nav className="p-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setDataHandler("route", "expense")}
                    className={`p-2 mx-2 rounded-md cursor-pointer ${
                      data.route === "expense"
                        ? "bg-gray-700 text-green-200"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Expense <em className="italic">(Debit)</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDataHandler("route", "income")}
                    className={`p-2 mx-2 rounded-md cursor-pointer ${
                      data.route === "income"
                        ? "bg-gray-700 text-green-200"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Income <em className="italic">(Credit)</em>
                  </button>
                </nav>
                <div className="mt-2 md:flex">
                  <input
                    className="text-gray-800 border-2 p-2 m-2 rounded-md"
                    type="text"
                    placeholder="Item Name"
                    required
                    value={data.name}
                    onChange={(e) => setDataHandler("name", e.target.value)}
                  />
                  <input
                    className="text-gray-800 border-2 p-2 m-2 rounded-md"
                    type="number"
                    placeholder="Amount in ₹"
                    required
                    value={data.amount}
                    onChange={(e) => setDataHandler("amount", e.target.value)}
                  />
                </div>
                <textarea
                  className="text-gray-800 border-2 p-2 m-2 rounded-md md:w-full resize-none"
                  rows={3}
                  cols={23}
                  placeholder="Description"
                  onChange={(e) =>
                    setDataHandler("description", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
