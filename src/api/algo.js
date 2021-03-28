import http from '@/api/http';
import { BASE_API } from './constants';

export function getAlgoAPI() {
    return new Promise((resolve, reject) => {
      http
        .get(`${BASE_API}admin/algo`)
        .then(({ data }) => {
          
          resolve(data);
        })
        .catch(({ response }) => reject(response));
    });
  }