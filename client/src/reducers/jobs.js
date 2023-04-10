import {
  ADD_JOB,
  GET_JOB,
  GET_JOBS,
  JOB_ERROR,
  REMOVE_JOB,
  UPDATE_JOB,
} from "../actions/types";

const initialState = {
  jobs: [],
  loading: true,
  job: null,
  error: null,
};

export default function job(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
        loading: false,
      };
    case GET_JOB:
      return {
        ...state,
        job: payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: [payload, ...state.jobs],
        loading: false,
      };
    case REMOVE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((business) => business._id !== payload),
        loading: false,
      };
    case JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
