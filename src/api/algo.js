import http from '@/api/http';
import { BASE_API } from './constants';

export function getAlgoAPI() {
    return new Promise((resolve, reject) => {
      http
        .get(`${PUBLIC_URL}/algo`)
        .then(({ data }) => {
          
          resolve(data);
        })
        .catch(({ response }) => reject(response));
    });
  }