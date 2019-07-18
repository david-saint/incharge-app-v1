import http from '@/api/http';
import { BASE_API } from './constants';
import { toUrlEncoded } from './helpers';

export const DEFAULT_PAGINATION = 20;

export function getClinicsAPI(params) {
  const q = toUrlEncoded(params);
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_API}user/clinics?${q}`)
      .then(({ data }) => resolve(data))
      .catch(({ response }) => reject(response));
  });
}
