import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { matchRoutes } from "react-router-config";
import { Request } from "express";
import { Store } from "redux";

import createStore from "../../helpers/createStore";
import Routes from "client/Routes";

const loadBackendDataToStore = async (path: string): Promise<Store> => {
  const store = createStore({ get: jest.fn() } as unknown as Request);
  const promises = matchRoutes(Routes, path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });
  await Promise.all(promises);
  return store;
};

// @ts-ignore
const ReduxAndRouterProviders =
  (path: string, store: Store): FC =>
  ({ children }) => {
    // pass fake req to router provider
    // supply with path to redirect to specific component
    const req = {
      path,
    };
    return (
      <Provider store={store}>
        <StaticRouter location={req.path}>{children}</StaticRouter>
      </Provider>
    );
  };

const ReduxProvider =
  (initialState: object = {}): FC =>
  ({ children }) => {
    // pass fake req to router provider
    const req = {
      get: function () {},
    } as unknown as Request;

    const store = createStore(req, initialState);
    return <Provider store={store}>{children}</Provider>;
  };

const renderWithRouter = (
  ui: ReactElement,
  path: string,
  store: Store,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ReduxAndRouterProviders(path, store), ...options });

const renderWithStore = (
  ui: ReactElement,
  initialState: object = {},
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ReduxProvider(initialState), ...options });

export * from "@testing-library/react";
export { renderWithRouter, renderWithStore, loadBackendDataToStore };
