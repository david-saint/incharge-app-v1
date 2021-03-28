import {
  submitProfileAPI,
  getEducationLevelsAPI,
  getContraceptionReasonsAPI,
} from '@/api';
import { setToken } from '@/api/http';

export const GET_PROFILING_FAILED = 'get-profiling-failed';
export const SET_PROFILING_FAILED = 'set-profiling-failed';
export const GET_PROFILING_REQUEST = 'get-profiling-request';
export const GET_PROFILING_SUCCESS = 'get-profiling-success';
export const SET_PROFILING_REQUEST = 'set-profiling-request';
export const SET_PROFILING_SUCCESS = 'get-profiling-success';
export const STORE_BASIC_PROFILE_DATA = 'store-basic-profile-data';
export const STORE_SEX_INFORMATION_DATA = 'store-sex-information-data';
export const STORE_MORE_INFORMATION_DATA = 'store-more-information-data';
export const GET_EDUCATION_LEVELS_FAILED = 'get-education-levels-failed';
export const GET_EDUCATION_LEVELS_REQUEST = 'get-education-levels-request';
export const GET_EDUCATION_LEVELS_SUCCESS = 'get-education-levels-success';
export const GET_CONTRACEPTION_REASONS_FAILED = 'get-contraception-reasons-failed';
export const GET_CONTRACEPTION_REASONS_REQUEST = 'get-contraception-reasons-request';
export const GET_CONTRACEPTION_REASONS_SUCCESS = 'get-contraception-reasons-success';

export function getProfileRequest() {
  return {
    type: GET_PROFILING_REQUEST,
    payload: {},
  };
}

export function storeBasicProfileData(data) {
  return {
    type: STORE_BASIC_PROFILE_DATA,
    payload: { data },
  };
}

export function storeMoreInformationData(data) {
  return {
    type: STORE_MORE_INFORMATION_DATA,
    payload: { data },
  };
}

export function storeSexInformationData(data) {
  return {
    type: STORE_SEX_INFORMATION_DATA,
    payload: { data },
  };
}

export function getProfileSuccess() {
  return {
    type: GET_PROFILING_SUCCESS,
    payload: {},
  };
}

export function getProfileFailed() {
  return {
    type: GET_PROFILING_FAILED,
    payload: {},
  };
}

export function setProfileRequest() {
  return {
    type: SET_PROFILING_REQUEST,
    payload: {},
  };
}

export function setProfileSuccess(profile) {
  return {
    type: SET_PROFILING_SUCCESS,
    payload: { profile },
  };
}

export function setProfileFailed() {
  return {
    type: SET_PROFILING_FAILED,
    payload: {},
  };
}

export function setProfile(profile, token) {
  setToken(token);
  return (dispatch) => {
    dispatch(setProfileRequest());
    return submitProfileAPI(profile)
      .then(({ data }) => {
        dispatch(setProfileSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setProfileFailed());
      });
  };
}

export function getProfile() {
  return (dispatch) => {
    console.log(dispatch);
  };
}

export function getEducationLevelRequest() {
  return {
    type: GET_EDUCATION_LEVELS_REQUEST,
    payload: {},
  };
}

export function getEducationLevelSuccess(levels) {
  return {
    type: GET_EDUCATION_LEVELS_SUCCESS,
    payload: { levels },
  };
}

export function getEducationLevelFailed() {
  return {
    type: GET_EDUCATION_LEVELS_FAILED,
    payload: {},
  };
}

export function getEducationLevels() {
  return (dispatch) => {
    dispatch(getEducationLevelRequest());
    return getEducationLevelsAPI()
      .then(({ data }) => {
        dispatch(getEducationLevelSuccess(data));
      })
      .catch((error) => {
        dispatch(getEducationLevelFailed());
      });
  };
}

export function getContraceptionReasonRequest() {
  return {
    type: GET_CONTRACEPTION_REASONS_REQUEST,
    payload: {},
  };
}

export function getContraceptionReasonSuccess(reasons) {
  return {
    type: GET_CONTRACEPTION_REASONS_SUCCESS,
    payload: { reasons },
  };
}

export function getContraceptionReasonFailed() {
  return {
    type: GET_CONTRACEPTION_REASONS_FAILED,
    payload: {},
  };
}

export function getContraceptionReasons() {
  return (dispatch) => {
    dispatch(getContraceptionReasonRequest());
    return getContraceptionReasonsAPI()
      .then(({ data }) => {
        dispatch(getContraceptionReasonSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getContraceptionReasonFailed());
      });
  };
}
