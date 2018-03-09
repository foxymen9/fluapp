import * as types from './actionTypes';
import { API_URL } from '@common';
import axios from 'axios';

export function getToken() {
  const data = {
    username: "Default",
    key: "xElvPeAKSeMYzJjAQB1SmyWQZQDV2bRx6zoUZPTKQvzD1Zgrf2SsjXM1XfAqtxEhaJrasQTAjcBZtV1gl7z9PI3hLS3P8yZBC57CnoRbItqKHnyUtWtlgqYfHiTV65GVqycZDF04sRLlXMywX6D5kH1zbm8yzxPQjTBcyFITty9ON3BhKr6tQCaItojPTEbsXz6kylPpi6kU0oyj2K6oV5uF1SmArQYfwkRjRsFzESCygyzLV2FCu6VfFMsG3BYq"
  }

  return {
    types: [types.TOKEN_REQUEST, types.TOKEN_SUCCESS, types.TOKEN_FAILED],
    promise:
      axios({
          method: 'post',
          url: `${API_URL}?route=api/login`,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          data: data
      })  
  };
}