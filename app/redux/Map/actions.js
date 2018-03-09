import * as types from './actionTypes';

export function saveMyLocation(data) {
  //Save user's current location
  return {
    type: types.SAVE_MY_LOCATION,
    data: data
  };
}