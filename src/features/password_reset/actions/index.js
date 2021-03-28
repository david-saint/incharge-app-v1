import { SubmissionError } from 'redux-form';
import { passwordResetAPI, throwError } from '@/api';

export const PASSWORD_FAILED = 'password-failed';
export const PASSWORD_REQUEST = 'password-request';
export const PASSWORD_SUCCESS = 'password-success';

export function passwordResetRequest(user) {
  return {
    type: PASSWORD_REQUEST,
    payload: { user },
  };
}

export function passwordResetSuccess(message) {
  return {
    type: PASSWORD_SUCCESS,
    payload: { message },
  };
}

export function passwordResetFailed(message, errors) {
  return {
    type: PASSWORD_FAILED,
    payload: { message, errors },
  };
}

export function passwordReset(user) {
  return (dispatch) => {
    dispatch(passwordResetRequest(user));
    return passwordResetAPI(user)
      .then(({ message }) => {
        if (message) {
          return dispatch(passwordResetSuccess(message));
        }
        dispatch(passwordResetFailed('Something went wrong.', {}));
        throw new SubmissionError({
          _error: 'Failed for unknown reasons',
        });
      })
      .catch((errors) => {
        dispatch(passwordResetFailed('Failed to reset password', errors));
        throw new SubmissionError({
          ...throwError(errors),
          _error: 'Failed to Log in',
        });
      });
  };
}
