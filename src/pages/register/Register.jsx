import { useRef } from "react";
import "./register.css";
import {registerCall } from "../../apiCalls";
import { useHistory } from "react-router";



export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity('passwords dont match')
    }else{
  const user = {
    name: username.current.value,
    email: email.current.value,
    password: password.current.value,
  };
      registerCall(user) && history.push('/login')
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
              type="email"
            />
            <input
              required
              type="Password"
              placeholder="Password"
              ref={password}
              className="loginInput"
            />
            <input
              required
              type="password"
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
