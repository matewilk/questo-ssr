import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const center = {
    display: "grid",
    justifyItems: "center",
  };

  return (
    <div style={center}>
      <LoginForm />
    </div>
  );
};

export default {
  component: LoginPage,
};
