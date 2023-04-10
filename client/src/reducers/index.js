import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import contact from "./contact";
import job from "./jobs";

export default combineReducers({
  alert,
  auth,
  contact,
  job,
});
