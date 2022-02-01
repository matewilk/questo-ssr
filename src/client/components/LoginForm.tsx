import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useInput } from "../hooks/useInput";
import { loginUser } from "../features/auth";

export const LoginForm = ({ login }: { login: Function }) => {
  // const txtUsername = useRef();
  const [usernameProps, resetUsername] = useInput("");
  // const txtPassword = useRef();
  const [passwordProps, resetPassword] = useInput("");

  const submit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ name: usernameProps.value, password: passwordProps.value });

    resetUsername();
    resetPassword();
  };

  return (
    <form onSubmit={submit}>
      <input
        {...usernameProps}
        // ref={txtUsername}
        type="text"
        placeholder="username ..."
        required
      />
      <input
        {...passwordProps}
        type="password"
        placeholder="password ..."
        required
      />
      <button>Submit</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: ({ name, password }: { name: string; password: string }) => {
    // @ts-ignore
    dispatch(loginUser({ name, password }));
  },
});

export default connect(null, mapDispatchToProps)(LoginForm);
