import axios from "axios";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const history = useHistory();
  const loginEmail = useRef();
  const loginPassword = useRef();
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: loginEmail.current.value,
      password: loginPassword.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );
      //   alert(response.data.message);
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accesstoken", getAccessToken);

      if (response.data.status === "success") {
        alert("loggedin sucessfully");
        history.replace("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
  };
  return (
    <>
      <Link to="/">home</Link>
      login:
      <br />
      email:
      <br />
      <form onSubmit={loginHandler}>
        <input type="email" ref={loginEmail} />
        <br />
        <br />
        passwoes
        <br />
        <input type="password" ref={loginPassword} />
        <button>login</button>
      </form>
    </>
  );
}

export default Login;
