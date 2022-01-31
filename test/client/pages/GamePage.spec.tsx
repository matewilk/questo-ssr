import React from "react";
import { renderWithRouter, fireEvent, waitFor, screen } from "test-utils";
import { renderRoutes } from "react-router-config";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Routes from "client/Routes";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "helpers/webSocketClient";

import { gqServer } from "../../helpers/wsApolloTestServer";
const { port } = gqServer();
// apolloClient (ApolloProvider) ws url (fake)
process.env.QUESTO_SSR_WS_URL = `ws://localhost:${port}/api`;

describe("GamePage", () => {
  beforeEach(() => {
    renderWithRouter(
      <ApolloProvider client={apolloClient(true)}>
        {renderRoutes(Routes)}
      </ApolloProvider>,
      "/game/123"
    );
  });

  it("displays GamePage", () => {
    expect(screen.getByText("Game Page")).toBeTruthy();
  });

  it("displays letter board area", () => {
    expect(screen.getAllByTestId('letter-box')).toBeTruthy();
  })
});
