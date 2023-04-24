import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";
import { ADD_APPLIED_JOB, GET_APPLIED_JOBS, APPLIED_JOB_ERROR } from "./types";

// Add job
export const applyForJob = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/api/jobs/apply`, formData);
    dispatch({
      type: ADD_APPLIED_JOB,
      payload: res.data,
    });
    dispatch(setAlert("Job Applied", "success"));

    return res;
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    dispatch({
      type: APPLIED_JOB_ERROR,
      payload: { status: err.message },
    });

    return err.message;
  }
};

// Get all jobs
export const getAppliedJobs = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/jobs/apply/${id}`);

    dispatch({
      type: GET_APPLIED_JOBS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPLIED_JOB_ERROR,
      payload: { status: err.message },
    });
  }
};
