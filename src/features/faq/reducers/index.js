import moment from 'moment';
import {
  GET_FAQ_GROUPS_FAILED,
  GET_FAQ_GROUPS_REQUEST,
  GET_FAQ_GROUPS_SUCCESS,
  GET_FAQ_GROUP_CONTENT_FAILED,
  GET_FAQ_GROUP_CONTENT_REQUEST,
  GET_FAQ_GROUP_CONTENT_SUCCESS,
} from '@/features/faq/actions';

const INIT_STATE = {
  groups: [],
  errors: false,
  lastGotten: moment('1995-12-25').format('YYYY-MM-DD HH:mm:ss'),
};

const faq = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case GET_FAQ_GROUPS_REQUEST:
      return {
        ...state,
        errors: false,
      };

    case GET_FAQ_GROUPS_FAILED:
      return {
        ...state,
        errors: true,
      };

    case GET_FAQ_GROUPS_SUCCESS:
      return {
        ...state,
        errors: false,
        groups: payload.data,
        lastGotten: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case GET_FAQ_GROUP_CONTENT_FAILED:
      return {
        ...state,
      };

    case GET_FAQ_GROUP_CONTENT_REQUEST:
      return {
        ...state,
      };

    case GET_FAQ_GROUP_CONTENT_SUCCESS:
      return {
        ...state,
        [payload.id]: payload.content,
      };

    default:
      return state;
  }
};

export default faq;
