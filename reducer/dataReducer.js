import dayjs from "dayjs";
import { DataActions } from "./actions";

export const initialDataState = {
  selectedDate: dayjs(),
  incomeData: [],
  expenseData: [],
  balance: 0,
};

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case DataActions.SET_SELECTED_DATE: {
      return { ...state, selectedDate: dayjs(payload) };
    }
    default:
      return state;
  }
};
