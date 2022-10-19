import dayjs from "dayjs";
import { DataActions } from "./actions";

export const initialDataState = {
  isLoading: false,
  error: "",
  selectedDate: dayjs(),
  incomeData: [],
  expenseData: [],
};

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case DataActions.SET_LOADER: {
      return { ...state, isLoading: true };
    }
    case DataActions.SET_ERROR: {
      return { ...state, error: payload };
    }
    case DataActions.SET_SELECTED_DATE: {
      return { ...state, selectedDate: dayjs(payload) };
    }
    case DataActions.SET_INCOME_DATA: {
      const incomeData = payload.map((data) => ({
        ...data,
        date: dayjs(data.date),
      }));
      return { ...state, incomeData };
    }
    case DataActions.SET_EXPENSE_DATA: {
      const expenseData = payload.map((data) => ({
        ...data,
        date: dayjs(data.date),
      }));
      return { ...state, expenseData };
    }
    case DataActions.ADD_EXPENSE: {
      return {
        ...state,
        expenseData: state.expenseData.concat(payload),
        isLoading: false,
      };
    }
    case DataActions.ADD_INCOME: {
      return {
        ...state,
        incomeData: state.incomeData.concat(payload),
        isLoading: false,
      };
    }
    case DataActions.REMOVE_EXPENSE: {
      return {
        ...state,
        expenseData: state.expenseData.filter((data) => data.id !== payload.id),
        isLoading: false,
      };
    }
    case DataActions.REMOVE_INCOME: {
      return {
        ...state,
        incomeData: state.incomeData.filter((data) => data.id !== payload.id),
        isLoading: false,
      };
    }
    case DataActions.UPDATE_INCOME_EXPENSE: {
      let incomeData = state.incomeData.filter(
        (data) => data.id !== payload.id
      );
      let expenseData = state.expenseData.filter(
        (data) => data.id !== payload.id
      );
      if (payload.route === "expense") {
        return {
          ...state,
          incomeData,
          expenseData: expenseData.concat(payload),
          isLoading: false,
        };
      }
      return {
        ...state,
        expenseData,
        incomeData: incomeData.concat(payload),
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
