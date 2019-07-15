import { userFetchAPI } from '@/api';
import { setToken } from '@/api/http';

export const USERFETCH_FAILED = 'userfetch-failed';
export const USERFETCH_REQUEST = 'userfetch-request';
export const USERFETCH_SUCCESS = 'userfetch-success';

export function userFetchRequest() {
  return {
    type: USERFETCH_REQUEST,
    payload: {},
  };
}

export function userFetchSuccess(user) {
  return {
    type: USERFETCH_SUCCESS,
    payload: { user },
  };
}

export function userFetchFailed() {
  return {
    type: USERFETCH_FAILED,
    payload: {},
  };
}

export function userFetch(token) {
  return (dispatch) => {
    setToken(token);
    dispatch(userFetchRequest());
    return userFetchAPI()
      .then(({ data }) => {
        dispatch(userFetchSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(userFetchFailed());
      });
  };
}
