import http from '@/api/http';
import { BASE_API } from './constants';

export function getFaqGroupAPI() {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}global/faq-groups`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}

export function getFaqGroupContentAPI(id) {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}global/faq-groups/${id}`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}
