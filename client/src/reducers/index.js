import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import contact from "./contact";
import job from "./jobs";
import profile from "./profile";
import appliedjob from "./appliedJob";

export default combineReducers({
  alert,
  auth,
  contact,
  job,
  profile,
  appliedjob,
});
