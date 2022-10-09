import { useDataContext } from "../context/dataContext";
import { DataActions } from "../reducer/actions";
import { formatedDate } from "../utilities";

export const MonthlyReport = () => {
  const {
    dataState: { selectedDate, balance },
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
                payload: selectedDate.add(-1, "month"),
              })
            }
            className="fa-solid fa-arrow-left pt-1 cursor-pointer"
          ></i>
          <section
            className="cursor-pointer"
            onClick={() => setShowDatePickerModal(true)}
          >
            {formatedDate(selectedDate, "MMMM YYYY")}
          </section>
          <span>Balance: ₹{balance.toFixed(2)}</span>
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
      <div> Monthly Report</div>
    </>
  );
};
