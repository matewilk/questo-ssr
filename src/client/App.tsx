import React from "react";
import { Dispatch } from "redux";
import { renderRoutes, RouteConfig } from "react-router-config";

import Header from "./components/Header";
import { fetchCurrentUser } from "./features/auth";

const App = ({ route }: { route: RouteConfig }) => {
  return (
    <>
      <Header />
      {renderRoutes(route.routes)}
    </>
  );
};

export default {
  component: App,
  // loadData function takes redux store as param
  // so we can deconstruct dispatch property
  loadData: ({ dispatch }: { dispatch: Dispatch }) =>
    dispatch<any>(fetchCurrentUser()),
};
