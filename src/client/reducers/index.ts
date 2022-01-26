import { combineReducers } from "redux";
import questions from "./questions";
import auth from "./auth";
import chat from "./chat";

export default combineReducers({
  questions,
  auth,
  chat,
});
