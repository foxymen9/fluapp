import {
  AsyncStorage,
} from 'react-native';
import RNFetchBlob from "react-native-fetch-blob";
import axios from 'axios';
import * as types from '../actionTypes';
import { 
  CLIENT_ID,
  CLIENT_SECRET,
  USERNAME,
  PASSWORD,
  USER_INFO,
  AUTH2_INFO,
  API_AUTH2_URL,
  API_SIGNIN_URL,
  API_SIGNUP_URL,
  API_GET_USER_DETAIL_URL,
  API_ATTACHMENT_URL,
  API_GET_ATTACHMENTS_URL,
} from '@common/styles/commonStrings';


export function getAuth2() {
  return (dispatch) => {
    dispatch({ type: types.USER_GET_AUTH2_REQUEST });
    const url = `${API_AUTH2_URL}?grant_type=password&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&username=${USERNAME}&password=${PASSWORD}`;
    axios.post(url)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.USER_GET_AUTH2_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.USER_GET_AUTH2_FAILED, payload: error.response.data });
    });
  };
}

export function signin(email) {
  return (dispatch) => {
    dispatch({ type: types.USER_SIGNIN_REQUEST });
    const url = `${API_SIGNIN_URL}'${email}'`;
    axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.totalSize > 0) {
          dispatch({ type: types.USER_SIGNIN_SUCCESS, payload: response.data });
          return;
        }
      }
      dispatch({ type: types.USER_SIGNIN_FAILED, payload: [{message: 'There is no the user.'}] });
    })
    .catch((error) => {
      dispatch({ type: types.USER_SIGNIN_FAILED, payload: error.response.data });
    });
  };
}

export function signup(email, name, phoneNumber) {
  return (dispatch) => {
    dispatch({ type: types.USER_SIGNUP_REQUEST });
    const url = API_SIGNUP_URL;
    const data = {
      Name: name,
      Patient_Email__c: email,
      Phone: phoneNumber,
    }
    axios.post(url, data)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.USER_SIGNUP_FAILED, payload: error.response.data });
    });
  };
}

export function updateUserInfo(Id, email, name, phoneNumber) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_USER_DETAIL_REQUEST });
    const url = `${API_SIGNUP_URL}${Id}`;
    const data = {
      Name: name,
      Patient_Email__c: email,
      Phone: phoneNumber,
    }
    axios.patch(url, data)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        dispatch({ type: types.UPDATE_USER_DETAIL_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.UPDATE_USER_DETAIL_FAILED, payload: error.response.data });
    });
  };
}

export function getUserDetail(id) {
  return (dispatch) => {
    dispatch({ type: types.GET_USER_DETAIL_REQUEST });
    const url = `${API_GET_USER_DETAIL_URL}${id}`
    axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: types.GET_USER_DETAIL_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.GET_USER_DETAIL_FAILED, payload: error.response.data });
    });
  };
}

export function setAuth2Info() {
  return (dispatch) => {
    AsyncStorage.getItem(AUTH2_INFO, (error, result) => {
      if (result) {
        const auth2 = JSON.parse(result);
        dispatch({ type: types.SET_LOCAL_STORAGE_AUTH2_INFO, payload: auth2 });
      }
    });
  };
}

export function resetAuth2Info() {
  return (dispatch) => {
    dispatch({ type: types.RESET_LOCAL_STORAGE_AUTH2_INFO });
  };
}

export function setUserInfo() {
  return (dispatch) => {
    AsyncStorage.getItem(USER_INFO, (error, result) => {
      if (result) {
        const userInfo = JSON.parse(result);
        dispatch({ type: types.SET_LOCAL_STORAGE_USER_INFO, payload: userInfo });
      }
    });
  };
}

export function resetUserInfo() {
  return (dispatch) => {
    dispatch({ type: types.RESET_LOCAL_STORAGE_USER_INFO });
  };
}

export function checkEmail(email) {
  return (dispatch) => {
    dispatch({ type: types.CHECK_EMAIL_EXISTING_REQUEST });
    const url = `${API_SIGNIN_URL}'${email}'`;
    axios.get(url)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.totalSize === 0) {
          dispatch({ type: types.CHECK_EMAIL_EXISTING_SUCCESS, payload: response.data });
          return;
        }
        dispatch({ type: types.CHECK_EMAIL_EXISTING_FAILED, payload: [{message: 'The email address is existing.'}] });
      }
    })
    .catch((error) => {
      dispatch({ type: types.CHECK_EMAIL_EXISTING_FAILED, payload: error.response.data });
    });
  };
}

export function uploadAttachment(Id, parentId, Name, ContentType, Description, Body) {
  return (dispatch) => {
    let url = API_ATTACHMENT_URL;
    let data = {
      parentId,
      Name,
      ContentType,
      Description,
      Body,
    }
    let method = 'post';
    if (Id) {
      url += Id;
      method = 'patch';
      data = {
        Name,
        ContentType,
        Description,
        Body,
      }
    }
    dispatch({ type: types.UPLOAD_ATTACHMENT_REQUEST });
    axios({
      method,
      url,
      data,
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        dispatch({ type: types.UPLOAD_ATTACHMENT_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      dispatch({ type: types.UPLOAD_ATTACHMENT_FAILED, payload: error.response.data });
    });
  };
}

export function getAttachments(parentId) {
  return (dispatch) => {
    dispatch({ type: types.GET_ATTACHMENTS_REQUEST });
    const url = `${API_GET_ATTACHMENTS_URL}'${parentId}'`;
    axios.get(url)
    .then((response) => {
      if (response.status >= 200 && response.status <= 300) {
        console.log('GET_ATTACHMENTS_SUCCESS : ', response.data);
        dispatch({ type: types.GET_ATTACHMENTS_SUCCESS, payload: response.data });
        return;
      }
    })
    .catch((error) => {
      console.log('GET_ATTACHMENTS_FAILED : ', error.response);
      dispatch({ type: types.GET_ATTACHMENTS_FAILED, payload: error.response.data });
    });
  };
}

export function getAttachmentBody(attachmentId, attachmentType, instanceUrl, tokenType, accessToken) {
  return (dispatch) => {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    let contentType = '';
    const url = `${instanceUrl}${API_ATTACHMENT_URL}${attachmentId}/Body`;
    dispatch({ type: types.GET_ATTACHMENT_BODY_REQUEST });
    
    RNFetchBlob.config({
      fileCache: true,      
    })
      .fetch(
        'get',
        url,
        { Authorization: `${tokenType} ${accessToken}`, }
      )
      // the image is now dowloaded to device's storage
      .then(response => {
        // the image path you can use it directly with Image component
        imagePath = response.path();
        contentType = response.info().headers['Content-Type'];
        return response.readFile("base64");
      })
      .then(base64Data => {
        // here's base64 encoded image
        const image = `data:${contentType};base64,${base64Data}`;
        dispatch({ type: types.GET_ATTACHMENT_BODY_SUCCESS, payload: image, attachmentType });
        // remove the file from storage
        return fs.unlink(imagePath);
      })
      .catch((error) => {
        dispatch({ type: types.GET_ATTACHMENT_BODY_FAILED, payload: error.response.data });
      });

  };
}
