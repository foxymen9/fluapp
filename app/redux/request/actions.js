import axios from 'axios';
import * as types from '../actionTypes';
import { 
  API_GET_DOCTORS_URL,
  API_GET_RQUESTS_URL,
  API_GET_USER_DETAIL_URL,
  API_CREATE_NEW_CASE_URL,
} from '@common/styles/commonStrings';


export function getDoctorNames() {
  return (dispatch) => {
    dispatch({ type: types.GET_DOCTORS_REQUEST });
    axios.get(API_GET_DOCTORS_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.GET_DOCTORS_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.GET_DOCTORS_FAILED, payload: error.response.data });
    });
  };
}

export function getRequests() {
  return (dispatch) => {
    dispatch({ type: types.GET_REQUESTS_REQUEST });
    axios.get(API_GET_RQUESTS_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.GET_REQUESTS_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.GET_REQUESTS_FAILED, payload: error.response.data });
    });
  };
}

export function createNewRequest(data) {
  return (dispatch) => {
    dispatch({ type: types.CREATE_NEW_REQUEST_REQUEST });
    axios.post(API_CREATE_NEW_CASE_URL, data)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: types.CREATE_NEW_REQUEST_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.CREATE_NEW_REQUEST_FAILED, payload: error.response.data });
    });
  };
}
