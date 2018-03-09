import * as types from './actionTypes';

const initialState = {
  loading: false,
  error:null,
  userInfo: null,
  userLogin: false,
  menuIndex: 0,
  verifyPhoneInfo: null,
  verifyCodeInfo: null,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* My Location Information
    /**************************/


    /**************************/
    /* Get API Token
    /**************************/
    case types.USER_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        userInfo: null,
      };
    case types.USER_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        userLogin: action.result.data.errors ? false : true,
        userInfo: action.result.data,
      }
    case types.USER_SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        userInfo: null,
        error: action.error,
      };

    /**************************/
    /* Verify user phone number
    /**************************/
    case types.VERIFY_PHONE_REQUEST:
    return {
      ...state,
      loading: true,
      veryfyPhoneInfo: null,
      verifyCodeInfo: null,
    };
  case types.VERIFY_PHONE_SUCCESS:
    return {
      ...state,
      loading: false,
      verifyPhoneInfo: action.result.data
    }
  case types.VERIFY_PHONE_FAILED:
    return {
      ...state,
      loading: false,
      verifyPhoneInfo: null,
    };

    /**************************/
    /* Verify phone code
    /**************************/
    case types.VERIFY_CODE_REQUEST:
    return {
      ...state,
      loading: true,
      verifyCodeInfo: null,
      verifyPhoneInfo: null,
    };
  case types.VERIFY_CODE_SUCCESS:
    return {
      ...state,
      loading: false,
      verifyCodeInfo: action.result.data
    }
  case types.VERIFY_CODE_FAILED:
    return {
      ...state,
      loading: false,
      verifyCodeInfo: null,
    };

    case types.USER_SIGN_OUT:
      return {
        ...state,
        userLogin: false,
      };

    case types.USER_SIGN_UP:
      return {
        ...state,
        userLogin: true,
      };

    case types.CHANGE_MENU:
      return {
        ...state,
        menuIndex: action.data
      }
    default:
      return state;
  }
}