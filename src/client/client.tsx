// Client side app starting point
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../helpers/webSocketClient";
import Routes from "./Routes";
import reducers from "./features";

// whenever using axios on the front-end
// use it with base url set to the one blow
//
// same actions with axios requests
// are used both by the front and server
// and because of the proxy setup (for cookie based authentication)
// this is needed to call express api proxy path
const axiosInstance = axios.create({
  baseURL: "/api",
});

const store = createStore(
  reducers,
  // @ts-ignore
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <ApolloProvider client={apolloClient(true)}>
    <Provider store={store}>
      <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
