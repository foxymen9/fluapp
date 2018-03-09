import * as types from './actionTypes';

const initialState = {
  loading: false,
  error:null,

  tokenInfo: null,
};

export default function token(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Get API Token
    /**************************/
    case types.TOKEN_REQUEST:
      return {
          ...state,
          loading: true,
      };
    case types.TOKEN_SUCCESS:
    // console.log('TOKEN_DATA', action);
      return {
        ...state,
        loading: true,
        tokenInfo: action.result.data,
      }
    case types.TOKEN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}