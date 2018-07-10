import * as types from '../actionTypes';

const initialState = {
  id: '',
  isActive: true,
  firstName: '',
  lastName: '',
  email: '',
  address: {},
  companyName: '',
  managerId: '',
  managerName: '',
  photo: {},
  username: '',
  name: '',
  displayName: '',
};


export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    case types.USER_PROFILE_REQUEST:
      return {
        ...state,
      };
    case types.USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case types.USER_PROFILE_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}