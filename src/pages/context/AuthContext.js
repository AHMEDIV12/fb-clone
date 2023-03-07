import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";

export const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isFetching: false,
  errror: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        PF,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
