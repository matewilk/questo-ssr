import React from "react";
import { Request } from "express";
import { Store } from "redux";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
// prevents from xss attacks (eg. inject executable browser script tag)
import serialize from "serialize-javascript";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "./webSocketClient";
import Routes from "../client/Routes";

export default (req: Request, store: Store) => {
  const content = renderToString(
    <ApolloProvider client={apolloClient()}>
      <Provider store={store}>
        <StaticRouter location={req.path} context={{}}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    </ApolloProvider>
  );

  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};
