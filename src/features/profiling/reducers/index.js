import moment from 'moment';
import {
  SET_PROFILING_FAILED,
  SET_PROFILING_REQUEST,
  SET_PROFILING_SUCCESS,
  STORE_BASIC_PROFILE_DATA,
  STORE_SEX_INFORMATION_DATA,
  STORE_MORE_INFORMATION_DATA,
  GET_EDUCATION_LEVELS_SUCCESS,
  GET_CONTRACEPTION_REASONS_SUCCESS,
} from '../actions';

const INIT_STATE = {
  age: 0,
  levels: [],
  gender: '',
  height: '',
  weight: '',
  address: '',
  reasons: [],
  children: 0,
  reason: null,
  error: false,
  religion: '',
  loading: false,
  occupation: '',
  religion_sect: '',
  date_of_birth: '',
  submitting: false,
  marital_status: '',
  education_level: '',
  sexually_active: false,
  pregnancy_status: false,
  last_fetched: moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
};

const profile = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SET_PROFILING_REQUEST:
      return {
        ...state,
        submitting: true,
      };

    case SET_PROFILING_FAILED:
      return {
        ...state,
        error: true,
        submitting: false,
      };

    case SET_PROFILING_SUCCESS:
      return {
        ...state,
        error: false,
        submitting: false,
        ...payload.profile,
        last_fetched: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case STORE_BASIC_PROFILE_DATA:
      return {
        ...state,
        age: payload.data.age,
        gender: payload.data.gender,
        address: payload.data.address,
        date_of_birth: payload.data.date_of_birth,
      };

    case STORE_MORE_INFORMATION_DATA:
      return {
        ...state,
        height: payload.data.height,
        weight: payload.data.weight,
        religion: payload.data.religion,
        occupation: payload.data.occupation,
        religion_sect: payload.data.religion_sector,
        education_level: payload.data.education_level,
      };

    case STORE_SEX_INFORMATION_DATA:
      return {
        ...state,
        reason: payload.data.reason,
        children: payload.data.children,
        marital_status: payload.data.marital_status,
        sexually_active: payload.data.sexually_active,
        pregnancy_status: payload.data.pregnant || false,
      };

    case GET_EDUCATION_LEVELS_SUCCESS:
      return {
        ...state,
        levels: payload.levels,
      };

    case GET_CONTRACEPTION_REASONS_SUCCESS:
      return {
        ...state,
        reasons: payload.reasons,
      };

    default:
      return state;
  }
};

export default profile;
