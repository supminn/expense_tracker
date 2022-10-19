import { AuthActions } from "./actions";

export const initialAuthState = {
  userData: null,
  isLoading: false,
  authToken: null,
  error: null,
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case AuthActions.SET_LOADER: {
      return { ...state, isLoading: payload };
    }
    case AuthActions.SET_ERROR: {
      return { ...state, error: payload, isLoading: false };
    }
    case AuthActions.SET_USER_DATA: {
      return {
        ...state,
        userData: payload.user,
        authToken: payload.authToken,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
