import React from "react";
import {
  renderWithRouter,
  screen,
  loadBackendDataToStore,
  fireEvent,
} from "test-utils";
import { renderRoutes } from "react-router-config";
import axios from "axios";
// @ts-ignore
import http from "axios/lib/adapters/http";
axios.defaults.adapter = http;

import { ApolloProvider, ApolloClient } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Express } from "express";
import { PubSub } from "graphql-subscriptions";
import { Server } from "http";

import { graphql } from "msw";
import { setupServer } from "msw/node";

import { gqServer } from "../../helpers/wsApolloTestServer";
import Routes from "client/Routes";

const startTestServer = async () => {
  return ({ port, app, apolloClient, wsLink, server, httpServer, pubSub } =
    await gqServer());
};

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

let server: any,
  app: Express,
  port: number,
  wsLink: WebSocketLink,
  apolloClient: ApolloClient<any>,
  httpServer: Server,
  pubSub: PubSub;
beforeAll(async () => {
  ({ server, port, apolloClient, httpServer } = await startTestServer());
  process.env.QUESTO_API_URL = `http://localhost:${port}/api`;
});
afterAll(async () => {
  await apolloClient.clearStore();
  apolloClient.stop();
  (wsLink as any).subscriptionClient.close();
  await wait(10);
  await httpServer.close();
});

const mockedUser = {
  ID: "12345",
  name: "testuser",
  type: "ADMIN",
};

const handlers = [
  graphql.query("CurrentUser", (req, res, ctx) => {
    return res(ctx.data({ currentUser: mockedUser }));
  }),
  // do not mock subscription mutation (KeyPress)
  // as it publishes subscription event
  // via test server - startTestServer
];

const mswServer = setupServer(...handlers);
beforeEach(() => mswServer.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("GamePage", () => {
  beforeEach(async () => {
    const path = "/game/123";
    const store = await loadBackendDataToStore(path);
    renderWithRouter(
      <ApolloProvider client={apolloClient}>
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

  it("displays letter after keyboard key press", async () => {
    fireEvent.keyPress(window, { key: "t" });

    const letters = await screen.findAllByText("t");
    expect(letters).toBeTruthy();
    expect(letters).toHaveLength(3);
  });
});
