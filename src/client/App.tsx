import React from "react";
import { Dispatch } from "redux";
import { renderRoutes, RouteConfig } from "react-router-config";

import Header from "./components/Header";
import { fetchCurrentUser } from "./actions";

const App = ({ route }: { route: RouteConfig }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  // loadData function takes redux store as param
  // so we can deconstruct dispatch property
  loadData: ({ dispatch }: { dispatch: Dispatch }) =>
    dispatch<any>(fetchCurrentUser()),
};
