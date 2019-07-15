import { SubmissionError } from 'redux-form';
import { loginUserAPI, throwError } from '@/api';
import { userFetch } from '@/features/authentication/actions';

export const LOGIN_FAILED = 'login-failed';
export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';

export function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    payload: { user },
  };
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
}

export function loginFailed(message, errors) {
  return {
    type: LOGIN_FAILED,
    payload: { message, errors },
  };
}

export function login(user) {
  return (dispatch) => {
    dispatch(loginRequest(user));
    return loginUserAPI(user)
      .then(({ token }) => {
        if (token) {
          dispatch(loginSuccess(token));
          return dispatch(userFetch(token));
        }
        dispatch(loginFailed('Something went wrong.', {}));
        throw new SubmissionError({
          _error: 'Failed for unknown reasons',
        });
      })
      .catch(({ data: { errors } }) => {
        dispatch(loginFailed('Failed to login', errors));
        throw new SubmissionError({
          ...throwError(errors),
          _error: 'Failed to login',
        });
      });
  };
}

// TODO: Set the errors based on network status.
