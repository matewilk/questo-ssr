import { combineReducers } from "redux";
import questions from "./questions";
import auth from "./auth";

export default combineReducers({
  questions,
  auth,
});
