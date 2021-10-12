import React from "react";
import App from "./App";
import HomePage from "./pages/HomePage";
import QuestionsListPage from "./pages/QuestionsListPage";
import { RouteConfig } from "react-router-config";

// use of react-router-config for SSA rendering
export default [
  {
    ...App,
    routes: [
      {
        path: "/",
        ...HomePage,
        exact: true,
      },
      {
        path: "/questions",
        ...QuestionsListPage,
      },
    ],
  },
] as RouteConfig[];
