import React from "react";
import { render, screen, fireEvent } from "test-utils";

import { LoginForm } from "client/components/LoginForm";

describe("LoginForm", () => {
  let login: Function;
  beforeEach(() => {
    login = jest.fn();
    render(<LoginForm login={login} />);
  });

  const fillInInputFields = (username: string, password: string) => {
    const usernameField: HTMLInputElement =
      screen.getByPlaceholderText("username ...");
    fireEvent.change(usernameField, { target: { value: username } });
    const passwordField: HTMLInputElement =
      screen.getByPlaceholderText("password ...");
    fireEvent.change(passwordField, { target: { value: password } });

    return {
      usernameField,
      passwordField,
    };
  };

  it("displays username and password fields", () => {
    expect(screen.getByPlaceholderText("username ...")).toBeDefined();
    expect(screen.getByPlaceholderText("password ...")).toBeDefined();
  });

  describe("onSubmit", () => {
    it("displays submit button", () => {
      expect(screen.getByText("Submit")).toBeDefined();
    });

    it("calls login function with params on submit", () => {
      fillInInputFields("user", "passwd");
      fireEvent.click(screen.getByText("Submit"));

      expect(login).toHaveBeenCalledWith({ name: "user", password: "passwd" });
    });

    it("clears inputs on submit", () => {
      const { usernameField, passwordField } = fillInInputFields(
        "user",
        "passwd"
      );
      fireEvent.click(screen.getByText("Submit"));

      expect(usernameField.value).toBe("");
      expect(passwordField.value).toBe("");
    });
  });
});
