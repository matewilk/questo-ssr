import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import { matchRoutes } from "react-router-config";
import { createProxyMiddleware } from "http-proxy-middleware";

import Routes from "./client/Routes";
import createStore from "./helpers/createStore";
import renderer from "./helpers/renderer";

const app = express();

// create reverse proxy for ws events
const wsProxy = createProxyMiddleware(process.env.QUESTO_API_WS_URL, {
  changeOrigin: true,
});

app.use("/api", createProxyMiddleware({ target: process.env.QUESTO_API_URL }));

// "/static" is needed so that React Router
// can resolve paths with params (e.g. /xxx/:id) properly
app.use("/static", express.static("public"));

// healthcheck for k8s/eks/aws/target group
app.get("/health", (req, res) => {
  res.status(200).send("service is healthy");
});

app.get("*", (req: Request, res: Response) => {
  // pass request to the server side store
  // to pass the cookie (for auth purposes)
  // to the function and pass it to axios
  // so that it can send a req with cookies attached
  const store = createStore(req);

  // iterate through routes and search for loadData function
  // inside a component (look into each component for the function)
  // to load data on the server side
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // pass store to loadData to be able to use action creators
    // within the components where actions are imported
    return route.loadData ? route.loadData(store) : null;
  });

  // wait for all loadData promises to resolve
  // and render the app
  Promise.all(promises).then(() =>
    // at this point store is full of data
    // from all the components that call
    // loadData function so we render it
    // straight from the backend
    res.send(renderer(req, store))
  );
});

const server = app.listen(3000, () => console.log("listening on port 3000"));
// handle websocket proxy upgrade
server.on("upgrade", wsProxy.upgrade);
