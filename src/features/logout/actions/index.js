import { logoutAPI } from '@/api';

export const LOGOUT_FAILED = 'logout-failed';
export const LOGOUT_REQUEST = 'logout-request';
export const LOGOUT_SUCCESS = 'logout-success';

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
    payload: {},
  };
}

export function logoutFailed() {
  return {
    type: LOGOUT_FAILED,
    payload: {},
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {},
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest());
    return logoutAPI()
      .then(() => dispatch(logoutSuccess()))
      .catch(() => dispatch(logoutFailed()));
  };
}
