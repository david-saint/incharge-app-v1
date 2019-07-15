/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { createSelector } from 'reselect';

const getId = state => state.auth.id;
const getLastLogin = state => state.auth.lastLogin;
const lastProfileFetch = state => state.profile.last_fetched;

export const isValidUser = createSelector(
  [getId, getLastLogin],
  (id, lastLogin) => id > 0 && (
    moment().isBetween(lastLogin, moment(lastLogin).add(2, 'days'), null, '[)')
  ),
);
export const hasSetProfile = createSelector(
  [lastProfileFetch],
  time => time !== moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
);
