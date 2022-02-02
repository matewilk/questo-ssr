import React from "react";
import { loadBackendDataToStore, renderWithRouter, screen } from "test-utils";
import { graphql } from "msw";
import { setupServer } from "msw/node";

import { renderRoutes } from "react-router-config";
// Routes is injected in 'test-utils' render method
// which renders the App with StaticRouter
// (see client/utils/test-utils.tsx file)
import Routes from "client/Routes";

const handlers = [
  graphql.query("CurrentUser", (req, res, ctx) => {
    return res(
      ctx.data({
        currentUser: {
          ID: "12345",
          name: "testuser",
          type: "ADMIN",
        },
      })
    );
  }),
];
const server = setupServer(...handlers);
beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.only("HomePage", () => {
  beforeEach(async () => {
    const path = "/";
    const store = await loadBackendDataToStore(path);
    renderWithRouter(<>{renderRoutes(Routes)}</>, path, store);
  });

  it("displays New Game link", () => {
    expect(screen.getByText("New Game")).toBeDefined();
  });

  it("displays New Game link with correct href parameter", () => {
    // @ts-ignore
    expect(screen.getByText("New Game").href).toMatch(/.*\/game\/[a-z0-9]{5}/);
  });

  it("displays Join Game link", () => {
    expect(screen.getByText("Join Game")).toBeDefined();
  });
});
