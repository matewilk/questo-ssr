import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import createStore from "../../helpers/createStore";
import { Request } from "express";

// @ts-ignore
const AllTheProviders =
  (path: string): FC =>
  ({ children }) => {
    const req = {
      get: function () {},
      path,
    } as unknown as Request;
    const store = createStore(req);
    // place all your app providers here
    return (
      <Provider store={store}>
        <StaticRouter location={req.path}>{children}</StaticRouter>
      </Provider>
    );
  };

const renderWithProviders = (
  ui: ReactElement,
  path: string,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders(path), ...options });

export * from "@testing-library/react";
export { renderWithProviders };
