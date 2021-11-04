import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import createStore from "../../helpers/createStore";
import { Request } from "express";

// @ts-ignore
const AllTheProviders: FC = ({ children }) => {
  const req = {
    get: function () {},
  } as unknown as Request;
  const store = createStore(req);
  // place all your app providers here
  return (
    <Provider store={store}>
      <StaticRouter>{children}</StaticRouter>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
