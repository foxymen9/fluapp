import axios from 'axios';
import * as types from '../actionTypes';
import { 
  CLIENT_ID,
  CLIENT_SECRET,
  API_SIGNIN_URL,
} from '@common/styles/commonStrings';


export function signin(email, password) {
  return (dispatch) => {
    dispatch({ type: types.USER_SIGNIN_REQUEST });
    const url = `${API_SIGNIN_URL}?grant_type=password&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&username=${email}&password=${password}`;
    axios.post(url)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.USER_SIGNIN_FAILED, payload: error.response.data });
    });
  };
}
