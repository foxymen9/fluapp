import * as types from './actionTypes';

const initialState = {
  type: '',
  error: {},
  success: '',
  spinning: false,
};

export default function status(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_GET_AUTH2_REQUEST:
    case types.SET_LOCAL_STORAGE_AUTH2_INFO:
    case types.USER_SIGNIN_REQUEST:
    case types.SET_LOCAL_STORAGE_USER_INFO:
    case types.CHECK_EMAIL_EXISTING_REQUEST:
    case types.USER_SIGNUP_REQUEST:
    case types.USER_PROFILE_REQUEST:
    case types.GET_DOCTORS_REQUEST:
    case types.GET_USER_DETAIL_REQUEST:
    case types.GET_REQUESTS_REQUEST:
    case types.CREATE_NEW_REQUEST_REQUEST:
      return {
        ...state,
        type: action.type,
        spinning: true,
        success: {},
        error: {},
      };
    case types.USER_GET_AUTH2_SUCCESS:
    case types.USER_SIGNIN_SUCCESS:
    case types.CHECK_EMAIL_EXISTING_SUCCESS:
    case types.USER_SIGNUP_SUCCESS:
    case types.USER_PROFILE_SUCCESS:
    case types.GET_DOCTORS_SUCCESS:
    case types.GET_USER_DETAIL_SUCCESS:
    case types.GET_REQUESTS_SUCCESS:
    case types.CREATE_NEW_REQUEST_SUCCESS:
      return {
        ...state,
        type: action.type,
        spinning: false,
        success: action.payload && action.payload.success ? action.payload.success : {},
      };
    case types.USER_GET_AUTH2_FAILED:
    case types.USER_SIGNIN_FAILED:
    case types.CHECK_EMAIL_EXISTING_FAILED:
    case types.USER_SIGNUP_FAILED:
    case types.USER_PROFILE_FAILED:
    case types.GET_DOCTORS_FAILED:
    case types.GET_USER_DETAIL_FAILED:
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
