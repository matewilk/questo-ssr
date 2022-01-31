import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import createStore from "../../helpers/createStore";
import { Request } from "express";

// @ts-ignore
const ReduxAndRouterProviders =
  (path: string): FC =>
  ({ children }) => {
    // pass fake req to router provider
    // supply with path to redirect to specific component
    const req = {
      get: function () {},
      path,
    } as unknown as Request;
    const store = createStore(req);

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
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ReduxAndRouterProviders(path), ...options });

const renderWithStore = (
  ui: ReactElement,
  initialState: object = {},
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ReduxProvider(initialState), ...options });

export * from "@testing-library/react";
export { renderWithRouter, renderWithStore };
