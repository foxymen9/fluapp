import * as types from '../actionTypes';
import axios from 'axios';

const initialState = {
  access_token: '',
  instance_url: '',
  id: '',
  token_type: '',
  issued_at: '',
  signature: '',
};


export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_SIGNIN_REQUEST:
      return {
        ...state,
      };
    case types.USER_SIGNIN_SUCCESS:
      axios.defaults.baseURL = action.payload.instance_url;
      axios.defaults.headers['Authorization'] = `${action.payload.token_type} ${action.payload.access_token}`;
      return {
        ...state,
        ...action.payload,
      }
    case types.USER_SIGNIN_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}