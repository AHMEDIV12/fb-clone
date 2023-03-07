import axios from "axios";

export const loginCall = async (userCrenetials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios
      .post("http://127.0.0.1:8000/api/auth/login", userCrenetials)
      .then((res) => {
        console.log(userCrenetials, res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(JSON.parse(localStorage.getItem("user")));
      });
    // console.log(res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const registerCall = async (user) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/auth/register", user);
  } catch (error) {
    console.log(error);
  }
};
