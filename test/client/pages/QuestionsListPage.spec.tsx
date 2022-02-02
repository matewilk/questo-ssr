import React from "react";
import { loadBackendDataToStore, renderWithRouter, screen } from "test-utils";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { renderRoutes } from "react-router-config";

import Routes from "client/Routes";

const mockedQuestionsList = {
  edges: [
    { text: "question 1" },
    { text: "question 2" },
    { text: "question 3" },
  ],
};

const mockedUser = {
  ID: "12345",
  name: "testuser",
  type: "ADMIN",
};

const handlers = [
  graphql.query("Questions", (req, res, ctx) => {
    return res(ctx.data({ questions: mockedQuestionsList }));
  }),
  graphql.query("CurrentUser", (req, res, ctx) => {
    return res(ctx.data({ currentUser: mockedUser }));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("QuestionsListPage", () => {
  beforeEach(async () => {
    const path = "/questions";
    const store = await loadBackendDataToStore(path);
    renderWithRouter(<>{renderRoutes(Routes)}</>, path, store);
  });

  it("displays list of questions", async () => {
    expect(await screen.findByText("question 1")).toBeTruthy();
    expect(await screen.findByText("question 2")).toBeTruthy();
    expect(await screen.findByText("question 3")).toBeTruthy();
  });
});
