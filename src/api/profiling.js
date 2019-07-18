import http from '@/api/http';
import { BASE_API } from './constants';

export function getEducationLevelsAPI() {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}global/education-levels`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function getContraceptionReasonsAPI() {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}global/contraception-reasons`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function submitProfileAPI(profile) {
  return new Promise((resolve, reject) => {
    const p = {
      ...profile,
      dob: profile.date_of_birth,
      levels: null,
      reasons: null,
    };
    http
      .post(`${BASE_API}user/profile`, p)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function setPlanAPI(plan) {
  return new Promise((resolve, reject) => {
    http
      .post(`${BASE_API}user/profile/algorithm`, { plan })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}
