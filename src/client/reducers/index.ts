import { combineReducers } from "redux";
import questions from "./questions";
import auth from "./auth";
import chat from "./chat";
import game from "./game";

export default combineReducers({
  questions,
  auth,
  chat,
  game,
});
