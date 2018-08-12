import * as types from '../actionTypes';
import axios from 'axios';
import {
  AsyncStorage,
} from 'react-native';

import * as commonStrings from '@common/styles/commonStrings';

const initialState = {
  // auth2
  access_token: '',
  instance_url: '',
  id: '',
  token_type: '',
  issued_at: '',
  signature: '',

  account: {
    // Id: null,
    // Name: null,
    // Phone: null,
    // Website: null,
    // PhotoUrl: null,
    // Patient_Email__c: '',
  },
};


export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_GET_AUTH2_REQUEST:
      return {
        ...state,
      };
    case types.USER_GET_AUTH2_SUCCESS:
      axios.defaults.baseURL = action.payload.instance_url;
      axios.defaults.headers['Authorization'] = `${action.payload.token_type} ${action.payload.access_token}`;
      AsyncStorage.setItem(commonStrings.Auth2Info, JSON.stringify(action.payload), () => {
      });
      return {
        ...state,
        ...action.payload,
      }
    case types.USER_GET_AUTH2_FAILED:
      return {
        ...state,
      };

    case types.USER_SIGNIN_REQUEST:
      return {
        ...state,
      };
    case types.USER_SIGNIN_SUCCESS:
      AsyncStorage.setItem(commonStrings.UserInfo, JSON.stringify(action.payload.records[0]), () => {
      });
      return {
        ...state,
        account: action.payload[0],
      }
    case types.USER_SIGNIN_FAILED:
      return {
        ...state,
      };

    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        account: {Id: action.payload.id},
      }
      
    case types.SET_LOCAL_STORAGE_AUTH2_INFO:
      axios.defaults.baseURL = action.payload.instance_url;
      axios.defaults.headers['Authorization'] = `${action.payload.token_type} ${action.payload.access_token}`;
      return {
        ...state,
        ...action.payload,
      }

    case types.RESET_LOCAL_STORAGE_AUTH2_INFO: 
      AsyncStorage.removeItem(commonStrings.Auth2Info, (error) => {
      });
      return {
        ...state,
        access_token: '',
        instance_url: '',
        id: '',
        token_type: '',
        issued_at: '',
        signature: '',
      }
      
    case types.SET_LOCAL_STORAGE_USER_INFO:
      return {
        ...state,
        account: action.payload,
      }

    case types.RESET_LOCAL_STORAGE_USER_INFO:
      AsyncStorage.removeItem(commonStrings.UserInfo, (error) => {
      });
      return {
        ...state,
        account: {},
      }

    case types.GET_USER_DETAIL_REQUEST:
      return {
        ...state,
      };
    case types.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        account: action.payload,
      }
    case types.GET_USER_DETAIL_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
}