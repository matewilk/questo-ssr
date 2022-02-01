import { createStore, applyMiddleware } from "redux";
import { Request } from "express";
import thunk from "redux-thunk";
import axios from "axios";

import reducers from "../client/features";

// initial stat is passed here only for testing
// otherwise, on the backend on prod
// the app is initalised with empty state {}
export default (req: Request, initialState = {}) => {
  const axiosInstance = axios.create({
    baseURL: process.env.QUESTO_API_URL,
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
    initialState,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};
