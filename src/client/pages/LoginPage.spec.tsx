import React from "react";
import { render, fireEvent, waitFor, screen } from "test-utils";
import { graphql } from "msw";
import { setupServer } from "msw/node";

import { renderRoutes } from "react-router-config";
// Routes is injected in 'test-utils' render method
// which renders the App with StaticRouter
// (see client/utils/test-utils.tsx file)
import Routes from "../Routes";

const mockedUser = {
  ID: "12345",
  name: "testuser",
  type: "ADMIN",
};

const handlers = [
  graphql.query("CurrentUser", (req, res, ctx) => {
    return res(ctx.data({ currentUser: mockedUser }));
  }),
  graphql.mutation("Login", (req, res, ctx) => {
    return res(ctx.data({ login: mockedUser }));
  }),
  graphql.query("Logout", (req, res, ctx) => {
    return res(ctx.data({ logout: { success: true } }));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginPage with Header", () => {
  // Render Login page with Header beforeEach
  beforeEach(() => render(<>{renderRoutes(Routes)}</>, "/login"));

  test("displays Header as expected", () => {
    expect(screen.getByText("Questo")).toBeTruthy();
    expect(screen.getByText("Questions")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });

  test("displays LoginPage as expected", () => {
    expect(screen.getByPlaceholderText("username ...")).toBeTruthy();
    expect(screen.getByPlaceholderText("password ...")).toBeTruthy();
  });

  test("submits login form successfully", async () => {
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => screen.getByText("Logout"));

    expect(screen.getByText("Logout")).toBeTruthy();
  });

  test("displays Header properly after successful login", async () => {
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => screen.getByText("Logout"));

    expect(screen.getByText("Questo")).toBeTruthy();
    expect(screen.getByText("Questions")).toBeTruthy();
    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByText("Logout")).toBeTruthy();
  });

  test("logs out user successfully", async () => {
    // log in user
    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => screen.getByText("Logout"));

    // log out user
    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => screen.getByText("Login"));
    expect(screen.getByText("Login")).toBeTruthy();
  });
});
