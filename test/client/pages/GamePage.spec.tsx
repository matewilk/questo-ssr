import React from "react";
import { renderWithRouter, screen, loadBackendDataToStore } from "test-utils";
import { renderRoutes } from "react-router-config";

import Routes from "client/Routes";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "helpers/webSocketClient";

import { graphql } from "msw";
import { setupServer } from "msw/node";

import { gqServer } from "../../helpers/wsApolloTestServer";
const { port } = gqServer();
// apolloClient (ApolloProvider) ws url (fake)
process.env.QUESTO_SSR_WS_URL = `ws://localhost:${port}/api`;

const mockedUser = {
  ID: "12345",
  name: "testuser",
  type: "ADMIN",
};

const handlers = [
  graphql.query("CurrentUser", (req, res, ctx) => {
    return res(ctx.data({ currentUser: mockedUser }));
  }),
];
const server = setupServer(...handlers);
beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("GamePage", () => {
  beforeEach(async () => {
    const path = "/game/123";
    const store = await loadBackendDataToStore(path);
    renderWithRouter(
      <ApolloProvider client={apolloClient(true)}>
        {renderRoutes(Routes)}
      </ApolloProvider>,
      path,
      store
    );
  });

  it("displays GamePage", () => {
    expect(screen.getByText("Game Page")).toBeTruthy();
  });

  it("displays letter board area", async () => {
    expect(await screen.queryAllByTestId("letter-box")).toBeTruthy();
  });
});
