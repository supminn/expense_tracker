import { createContext, useContext, useReducer, useEffect } from "react";
import {
  useSignUpEmailPassword,
  useSignInEmailPassword,
  useSignOut,
  useUserData,
  useAccessToken,
} from "@nhost/nextjs";
import { nhost } from "../services";
import { authReducer, initialAuthState } from "../reducer/authReducer";
import { AuthActions } from "../reducer/actions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const { signUpEmailPassword } = useSignUpEmailPassword();
  const { signInEmailPassword } = useSignInEmailPassword();
  const { signOut } = useSignOut();

  const user = useUserData();
  const accessToken = useAccessToken();

  useEffect(() => {
    if (accessToken && user) {
      // add loader and show in UI
      authDispatch({
        type: AuthActions.SET_USER_DATA,
        payload: { user: user, authToken: accessToken },
      });
    }
  }, [user, accessToken]);

  const registerNewUser = async ({ password, email, name }) => {
    authDispatch({ type: AuthActions.SET_LOADER, payload: true });
    const response = await signUpEmailPassword(email, password, {
      displayName: `${name}`.trim(),
      metadata: {
        name,
      },
    });
    if (response.isSuccess) {
      authDispatch({
        type: AuthActions.SET_USER_DATA,
        payload: { user: response.user, authToken: response.accessToken },
      });
      return { isSuccess: true };
    }
    if (response.isError) {
      authDispatch({
        type: AuthActions.SET_ERROR,
        payload: response?.error?.message,
      });
      return { isSuccess: false };
    }
  };

  const userSignIn = async ({ email, password }) => {
    authDispatch({ type: AuthActions.SET_LOADER, payload: true });
    const response = await signInEmailPassword(email, password);
    if (response.isSuccess) {
      authDispatch({
        type: AuthActions.SET_USER_DATA,
        payload: { user: response.user, authToken: response.accessToken },
      });
      return { isSuccess: true };
    }
    if (response.isError) {
      authDispatch({
        type: AuthActions.SET_ERROR,
        payload: response?.error?.message,
      });
      return { isSuccess: false };
    }
  };

  const userLogout = async () => {
    authDispatch({ type: AuthActions.SET_LOADER, payload: true });
    const response = await signOut();
    if (response.isSuccess) {
      authDispatch({
        type: AuthActions.SET_USER_DATA,
        payload: { user: null, authToken: null },
      });
      return { isSuccess: true };
    }
    if (response.isError) {
      authDispatch({
        type: AuthActions.SET_ERROR,
        payload: response?.error?.message,
      });
      return { isSuccess: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        registerNewUser,
        userSignIn,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };
