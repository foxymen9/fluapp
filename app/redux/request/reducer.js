import * as types from '../actionTypes';

const initialState = {
  doctors: {},
  doctor: {},
  requests: {},
};


export default function request(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_DOCTORS_REQUEST:
      return {
        ...state,
      };
    case types.GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: action.payload,
      }
    case types.GET_DOCTORS_FAILED:
      return {
        ...state,
      };
    case types.GET_REQUESTS_REQUEST:
      return {
        ...state,
      };
    case types.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      }
    case types.GET_REQUESTS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}