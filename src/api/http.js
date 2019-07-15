import * as axios from 'axios';

const http = axios.create();

http.defaults.headers.common.Accept = 'application/json, text/plain, */*';

export function setToken(token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export { http as default };
