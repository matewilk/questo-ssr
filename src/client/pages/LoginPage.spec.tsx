import React from "react";
import { render, fireEvent, waitFor, screen } from "test-utils";
import { graphql } from "msw";
import { setupServer } from "msw/node";

import LoginPage from "./LoginPage";
import Header from "../components/Header";

const server = setupServer(
  graphql.mutation("Login", (req, res, ctx) => {
    return res(ctx.data({ login: true }));
  })
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays different page links after login", async () => {
  render(<><Header/><LoginPage.component /></>);

  fireEvent.click(screen.getByText("Submit"));

  await waitFor(() => screen.getByText("Logout"));

  expect(screen.getByText("Logout")).toBeTruthy();
});
