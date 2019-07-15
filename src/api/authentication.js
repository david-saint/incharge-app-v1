import http from '@/api/http';
import { BASE_API } from './constants';

export function registerUserAPI(user) {
  return new Promise((resolve, reject) => {
    http
      .post(`${BASE_API}user/register`, user)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function loginUserAPI(user) {
  return new Promise((resolve, reject) => {
    http
      .post(`${BASE_API}user/login`, user)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function userFetchAPI() {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}user/`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function passwordResetAPI(user) {
  return new Promise((resolve, reject) => {
    http
      .post(`${BASE_API}user/password/email`, user)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}
