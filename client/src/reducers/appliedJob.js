import {
  ADD_APPLIED_JOB,
  GET_APPLIED_JOBS,
  APPLIED_JOB_ERROR,
} from "../actions/types";

const initialState = {
  appliedjobs: [],
  loading: true,
  error: null,
};

export default function appliedjob(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_APPLIED_JOBS:
      return {
        ...state,
        appliedjobs: payload,
        loading: false,
      };

    case ADD_APPLIED_JOB:
      return {
        ...state,
        appliedjobs: [payload, ...state.jobs],
        loading: false,
      };

    case APPLIED_JOB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
