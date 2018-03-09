import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function userSignOut() {
  //Save user's current location
  return {
    type: types.USER_SIGN_OUT,
  };
}

export function userSignIn(data, token) {
  //Save user's current location

  return {
    types: [types.USER_SIGN_IN_REQUEST, types.USER_SIGN_IN_SUCCESS, types.USER_SIGN_IN_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/login&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function verifyPhone(data, token) {
  return {
    types: [types.VERIFY_PHONE_REQUEST, types.VERIFY_PHONE_SUCCESS, types.VERIFY_PHONE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/validatePhone&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function verifyCode(data, token) {
  return {
    types: [types.VERIFY_CODE_REQUEST, types.VERIFY_CODE_SUCCESS, types.VERIFY_CODE_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/customer/validateCode&api_token=${token}`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}

export function userSignUp() {
  return {
    type: types.USER_SIGN_UP,
  };
}

export function changeMenu(index) {
  return {
    type: types.CHANGE_MENU,
    data: index,
  }
}