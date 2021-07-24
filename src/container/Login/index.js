import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Notification from "./../../components/Notification";
import { login } from "Utils/http";

const Login = ({ history }) => {
  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const resetError = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  const handleLogin = (value) => {
    setIsLoggingIn(true);
    login({
      email: value.email,
      password: value.password,
    })
      .then((response) => {
        let userData = response.data;
        console.log("user data", userData, response);
        userData.isLoggedIn = true;
        localStorage.setItem("userInfo", JSON.stringify(userData));
        history.push("/company");
        setIsLoggingIn(false);
      })
      .catch((error) => {
        setIsLoggingIn(false);
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        console.log("Error in logging in", error);
      });
  };
  return (
    <React.Fragment>
      {errorObject.open && (
        <Notification
          handleClose={resetError}
          open={errorObject.open}
          message={errorObject.message}
          messageType={errorObject.messageType}
        />
      )}
      <LoginForm
        onSubmit={handleLogin}
        isLoggingIn={isLoggingIn}
        handleForgotPassword={() => {}}
      />
    </React.Fragment>
  );
};

export default Login;
