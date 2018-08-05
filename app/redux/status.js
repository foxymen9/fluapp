import * as types from './actionTypes';

const initialState = {
  type: '',
  error: {},
  success: '',
  spinning: false,
};

export default function status(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_SIGNIN_REQUEST:
    case types.USER_PROFILE_REQUEST:
    case types.GET_DOCTORS_REQUEST:
    case types.GET_DOCTOR_DETAIL_REQUEST:
    case types.GET_REQUESTS_REQUEST:
    case types.CREATE_NEW_REQUEST_REQUEST:
      return {
        ...state,
        type: action.type,
        spinning: true,
        success: {},
        error: {},
      };
    case types.USER_SIGNIN_SUCCESS:
    case types.USER_PROFILE_SUCCESS:
    case types.GET_DOCTORS_SUCCESS:
    case types.GET_DOCTOR_DETAIL_SUCCESS:
    case types.GET_REQUESTS_SUCCESS:
    case types.CREATE_NEW_REQUEST_SUCCESS:
      return {
        ...state,
        type: action.type,
        spinning: false,
        success: action.payload && action.payload.success ? action.payload.success : {},
      };
    case types.USER_SIGNIN_FAILED:
    case types.USER_PROFILE_FAILED:
    case types.GET_DOCTORS_FAILED:
    case types.GET_DOCTOR_DETAIL_FAILED:
    case types.GET_REQUESTS_FAILED:
    case types.CREATE_NEW_REQUEST_FAILED:
      return {
        ...state,
        type: action.type,
        spinning: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
