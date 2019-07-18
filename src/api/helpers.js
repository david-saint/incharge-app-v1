export function throwError(e) {
  if (typeof e !== 'object') {
    return {};
  }
  return Object.entries(e)
    .map(([key, val]) => ([key, val.join(',')]))
    .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
}

export function log(m) { console.log(m); }

export const has = Object.prototype.hasOwnProperty;

export const toUrlEncoded = obj => Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
