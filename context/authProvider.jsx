import { createContext, useContext, useReducer } from "react";
import { authReducer, initialAuthState } from "../reducer/authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ authDispatch, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
