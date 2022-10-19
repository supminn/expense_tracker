import { createContext, useContext, useEffect, useReducer } from "react";
import { clearErrorMessage } from "../reducer/actions";
import { dataReducer, initialDataState } from "../reducer/dataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  useEffect(() => {
    if (dataState.error) {
      setTimeout(() => {
        clearErrorMessage(dataDispatch);
      }, [3000]);
    }
  }, [dataState.error]);

  return (
    <DataContext.Provider value={{ dataDispatch, dataState }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export { useDataContext, DataProvider };
