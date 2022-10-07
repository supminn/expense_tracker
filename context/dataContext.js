import { createContext, useContext, useReducer } from "react";
import { dataReducer, initialDataState } from "../reducer/dataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  return (
    <DataContext.Provider value={{ dataDispatch, dataState }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => useContext(DataContext);

export { useDataContext, DataProvider };
