import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {isFetching, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // console.log(user);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">7amada_Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on 7amada_Social.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton" disabled={isFetching} >
              {isFetching ? (
                <CircularProgress color="white" size="35px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="35px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
