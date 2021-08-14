import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import message from "./message";

export default combineReducers({
  auth,
  profile,
  message,
});
