import axios from "axios";
import { HOST } from "../App";
import { setAlert } from "./alert";
import {
  ADD_JOB,
  GET_JOB,
  GET_JOBS,
  JOB_ERROR,
  REMOVE_JOB,
  UPDATE_JOB,
} from "./types";

// Add job
export const addJob = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${HOST}/api/jobs`, formData);
    dispatch({
      type: ADD_JOB,
      payload: res.data,
    });
    dispatch(setAlert("Job Created", "success"));

    console.log(res);

    return res;
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    dispatch({
      type: JOB_ERROR,
      payload: { status: err.message },
    });

    return err.message;
  }
};

// Get Jobs
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/jobs`);
    dispatch({
      type: GET_JOBS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Job
export const getJob = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/api/jobs/${id}`);
    dispatch({
      type: GET_JOB,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Job
export const updateJob = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`${HOST}/api/jobs/${id}`, formData);
    dispatch({
      type: UPDATE_JOB,
      payload: res.data,
    });
    dispatch(setAlert("Job Updated", "success"));

    return res.data;
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove Job
export const removeJob = (id) => async (dispatch) => {
  try {
    await axios.delete(`${HOST}/api/jobs/${id}`);
    dispatch({
      type: REMOVE_JOB,
      payload: id,
    });
    dispatch(setAlert("Job Removed", "success"));
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
