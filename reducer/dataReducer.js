import dayjs from "dayjs";
import { formatedDate } from "../utilities";

export const initialDataState = {
  selectedDate: formatedDate(dayjs()),
  incomeData: [],
  expenseData: [],
  total: 0,
};

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
