import moment from 'moment';
import {
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '@/features/logout/actions';
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '@/features/register/actions';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '@/features/login/actions';
import {
  PASSWORD_FAILED,
  PASSWORD_REQUEST,
  PASSWORD_SUCCESS,
} from '@/features/password_reset/actions';
import {
  USERFETCH_FAILED,
  USERFETCH_REQUEST,
  USERFETCH_SUCCESS,
} from '../actions';

const INIT_STATE = {
  id: -1,
  token: '',
  name: '',
  email: '',
  message: '',
  error: false,
  expired: true,
  loading: false,
  created_at: '',
  updated_at: '',
  email_confirmed: false,
  phone_confirmed: false,
  lastLogin: moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
  lastLogout: moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
};

const auth = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        name: payload.user.name,
        email: payload.user.email,
        phone: payload.user.phone,
        password: payload.user.password,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload.user,
        error: false,
        loading: false,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        expired: false,
        token: payload.token,
        lastLogin: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case LOGIN_FAILED:
      return {
        ...INIT_STATE,
        error: true,
        loading: false,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        lastLogin: moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: '',
        lastLogout: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        error: true,
      };

    case USERFETCH_FAILED:
      return {
        ...state,
        token: '',
        error: true,
        loading: false,
      };

    case USERFETCH_SUCCESS:
      return {
        ...state,
        ...payload.user,
        error: false,
        loading: false,
        expired: false,
        lastLogin: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case USERFETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PASSWORD_FAILED:
      return {
        ...state,
        message: payload.message,
        error: true,
      };

    case PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload.message,
        error: false,
        loading: false,
      };

    case PASSWORD_REQUEST:
      return {
        ...state,
        ...payload.user,
        loading: true,
      };

    default:
      return state;
  }
};

export default auth;
