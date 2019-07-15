import http from '@/api/http';
import { BASE_API } from './constants';

export const DEFAULT_PAGINATION = 20;

const toUrlEncoded = obj => Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

export function getClinicsAPI(params) {
  const q = toUrlEncoded(params);
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}user/clinics?${q}`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}
