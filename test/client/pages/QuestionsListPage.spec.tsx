import React from "react";
import { renderWithRouter, screen } from "test-utils";
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

const handlers = [
  graphql.query("Questions", (req, res, ctx) => {
    return res(ctx.data({ questions: mockedQuestionsList }));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("QuestionsListPage", () => {
  beforeEach(() => {
    renderWithRouter(<>{renderRoutes(Routes)}</>, "/questions");
  });

  it("displays list of questions", async () => {
    expect(await screen.findByText("question 1")).toBeTruthy();
    expect(await screen.findByText("question 2")).toBeTruthy();
    expect(await screen.findByText("question 3")).toBeTruthy();
  });
});
