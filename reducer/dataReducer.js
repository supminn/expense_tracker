import dayjs from "dayjs";
import { DataActions } from "./actions";

export const initialDataState = {
  selectedDate: dayjs(),
  incomeData: [],
  expenseData: [],
};

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case DataActions.SET_SELECTED_DATE: {
      return { ...state, selectedDate: dayjs(payload) };
    }
    case DataActions.ADD_EXPENSE: {
      return {
        ...state,
        expenseData: state.expenseData.concat(payload),
      };
    }
    case DataActions.ADD_INCOME: {
      return {
        ...state,
        incomeData: state.incomeData.concat(payload),
      };
    }
    case DataActions.REMOVE_EXPENSE: {
      return {
        ...state,
        expenseData: state.expenseData.filter((data) => data.id !== payload.id),
      };
    }
    case DataActions.REMOVE_INCOME: {
      return {
        ...state,
        incomeData: state.incomeData.filter((data) => data.id !== payload.id),
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
        };
      }
      return {
        ...state,
        expenseData,
        incomeData: incomeData.concat(payload),
      };
    }
    default:
      return state;
  }
};
