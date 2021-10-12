import { createStore, applyMiddleware } from "redux";
import { Request } from "express";
import thunk from "redux-thunk";
import axios from "axios";

import reducers from "../client/reducers";

export default (req: Request) => {
  const axiosInstance = axios.create({
    // TODO: change to env variable
    baseURL: "http://localhost:4000",
    headers: {
      // trick the api with a cookie (based auth)
      // so that it (the api) thinks the request
      // is coming from the browser and not from
      // the backend (express)
      cookie: req.get("cookie") || "",
    },
  });
  return createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};
