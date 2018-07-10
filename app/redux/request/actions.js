import axios from 'axios';
import * as types from '../actionTypes';
import { 
  API_GET_DOCTORS_URL,
  API_GET_RQUESTS_URL,
  API_GET_DOCTOR_DETAIL_URL
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

export function getDoctorDetail(id) {
  return (dispatch) => {
    dispatch({ type: types.GET_DOCTOR_DETAIL_REQUEST });
    const url = `${API_GET_DOCTOR_DETAIL_URL}${id}`
    axios.get(url)
    .then((response) => {
      console.log('Response : ', response);
      if (response.status === 200) {
        dispatch({ type: types.GET_DOCTOR_DETAIL_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      console.log('Error : ', error);
      dispatch({ type: types.GET_DOCTOR_DETAIL_FAILED, payload: error.response.data });
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
