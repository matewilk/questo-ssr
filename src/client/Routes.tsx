import React from "react";
import App from "./App";
import HomePage from "./pages/HomePage";
import QuestionsListPage from "./pages/QuestionsListPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
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
      {
        path: "/users",
        ...UsersPage,
      },
      {
        path: "/login",
        ...LoginPage,
      },
    ],
  },
] as RouteConfig[];
