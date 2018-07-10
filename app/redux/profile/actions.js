import axios from 'axios';
import * as types from '../actionTypes';
import { 
  API_PROFILE_URL,
} from '@common/styles/commonStrings';


export function getMyProfile() {
  return (dispatch) => {
    dispatch({ type: types.USER_PROFILE_REQUEST });
    axios.get(API_PROFILE_URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.USER_PROFILE_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.USER_PROFILE_FAILED, payload: error.response.data });
    });
  };
}
