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

  account: {},
    // Id: null,
    // Name: null,
    // Phone: null,
    // Website: null,
    // PhotoUrl: null,
    // Patient_Email__c: '',
  
  attachments: [],
    // Id: "00P0a00000cQ3aLEAS",
    // ParentId: "0010a00001OufSTAAZ",
    // Name: "Hummer_2010_Make_640.jpg",
    // ContentType: "image/jpeg",
    // BodyLength: 16022,
    // Body: "/services/data/v43.0/sobjects/Attachment/00P0a00000cQ3aLEAS/Body",
    // Description: "{\"mime_type\":\"image/jpeg\",\"image_category\":\"CardBack\"}"
  userAvatar: null,
  insuranceCardFront: null,
  insuranceCardBack: null,
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
      AsyncStorage.setItem(commonStrings.AUTH2_INFO, JSON.stringify(action.payload), () => {
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
      AsyncStorage.setItem(commonStrings.USER_INFO, JSON.stringify(action.payload.records[0]), () => {
      });
      return {
        ...state,
        account: action.payload.records[0],
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
      AsyncStorage.removeItem(commonStrings.AUTH2_INFO, (error) => {
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
      AsyncStorage.removeItem(commonStrings.USER_INFO, (error) => {
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

    case types.GET_ATTACHMENTS_REQUEST:
      return {
        ...state,
      };
    case types.GET_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        attachments: action.payload.records,
      }
    case types.GET_ATTACHMENTS_FAILED:
      return {
        ...state,
      };

    case types.UPLOAD_ATTACHMENT_REQUEST:
      return {
        ...state,
      };
    case types.UPLOAD_ATTACHMENT_SUCCESS:
      return {
        ...state,
      }
    case types.UPLOAD_ATTACHMENT_FAILED:
      return {
        ...state,
      };

    case types.GET_ATTACHMENT_BODY_REQUEST:
      return {
        ...state,
      };
    case types.GET_ATTACHMENT_BODY_SUCCESS:
      if (action.attachmentType === commonStrings.INSURANCE_CARD_FRONT_IMAGE) {
        return {
          ...state,
          insuranceCardFront: action.payload,
        }
      } else if (action.attachmentType === commonStrings.INSURANCE_CARD_BACK_IMAGE) {
        return {
          ...state,
          insuranceCardBack: action.payload,
        }
      } else if (action.attachmentType === commonStrings.USER_AVATAR_IMAGE) {
        return {
          ...state,
          userAvatar: action.payload,
        }
      }
    case types.GET_ATTACHMENT_BODY_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
}