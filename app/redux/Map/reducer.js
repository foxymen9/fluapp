import * as types from './actionTypes';

const initialState = {
  myLocation: null
};

export default function map(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* My Location Information
    /**************************/
    case types.SAVE_MY_LOCATION:
      return {
        ...state,
        myLocation: action.data,
      };
    default:
      return state;
  }
}