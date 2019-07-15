import { SubmissionError } from 'redux-form';
import { login } from '@/features/login/actions';
import { registerUserAPI, throwError } from '@/api';

export const REGISTER_FAILED = 'register-failed';
export const REGISTER_REQUEST = 'register-request';
export const REGISTER_SUCCESS = 'register-success';

export function registerRequest(user) {
  return {
    type: REGISTER_REQUEST,
    payload: { user },
  };
}

export function registerSuccess(user, message) {
  return {
    type: REGISTER_SUCCESS,
    payload: { user, message },
  };
}

export function registerFailed(message, errors) {
  return {
    type: REGISTER_FAILED,
    payload: { message, errors },
  };
}

export function register(user) {
  return (dispatch) => {
    dispatch(registerRequest(user));
    return registerUserAPI(user)
      .then(({ data, message, status }) => {
        dispatch(registerSuccess(data, message));
        if (status) {
          dispatch(login(user));
          return dispatch(registerSuccess(data, message));
        }
        dispatch(registerFailed(message, {}));
        throw new SubmissionError({
          _error: message,
        });
      })
      .catch(({ data: { message, errors } }) => {
        dispatch(registerFailed(message, errors));
        throw new SubmissionError({
          ...throwError(errors),
          _error: 'Failed to sign up.',
        });
      });
  };
}
