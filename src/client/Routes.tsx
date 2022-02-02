import React from "react";
import { RouteConfig } from "react-router-config";

import App from "./App";
import HomePage from "./pages/HomePage";
import QuestionsListPage from "./pages/QuestionsListPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import GamePage from "./pages/GamePage";
import JoinGamePage from "./pages/JoinGamePage";

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
        path: "/game/:id",
        ...GamePage,
        exact: false,
      },
      {
        path: "/join",
        ...JoinGamePage,
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
