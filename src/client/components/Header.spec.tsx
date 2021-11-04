import React from "react";
import { render, fireEvent, waitFor, screen } from "test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";

import LoginPage from "../pages/LoginPage";

const server = setupServer(
  rest.post("/login", (req, res, ctx) => {
    return res(ctx.json({ data: { data: { login: true } } }));
  })
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays different page links after login", async () => {
  render(<LoginPage.component />);

  fireEvent.click(screen.getByText("Login"));

  await waitFor(() => screen.getByText("Logout"));

  expect(screen.getByText("Logout")).toBeTruthy();
});
