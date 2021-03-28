import moment from 'moment';
import {
  START_ALGORITHM,
  SET_PLAN_FAILED,
  SET_PLAN_REQUEST,
  SET_PLAN_SUCCESS,
  SET_PERIOD_CALENDAR,
  SET_ALGO_SUCCESS,
  GET_ALGO_REQUEST,
  SET_PERIOD_CALCULATOR_DETAILS,
} from '../actions';

const INIT_STATE = {
  plan: '',
  marks: {},
  algo: [],
  failed: false,
  persisted: false,
  last_retry: null,
  cycle_length: null,
  period_length: null,
  period_calendar: false,
  ran_algorithm_at: null,
  last_period_started_at: null,
};

const algorithm = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case SET_PLAN_REQUEST:
      return {
        ...state,
        plan: payload.plan,
        ran_algorithm_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case SET_PLAN_FAILED:
      return {
        ...state,
        failed: true,
        persisted: false,
        last_retry: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

    case SET_PLAN_SUCCESS:
      return {
        ...state,
        failed: false,
        persisted: true,
        last_retry: null,
        plan: payload.plan,
      };

    case SET_ALGO_SUCCESS:
      return {
        ...state,
        failed: false,
        persisted: true,
        last_retry: null,
        algo: payload.algo,
      };
    case GET_ALGO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SET_PERIOD_CALCULATOR_DETAILS:
      return {
        ...state,
        ...payload.details,
        period_calendar: true,
      };

    case START_ALGORITHM:
      return {
        ...state,
        ran_algorithm_at: null,
        period_calendar: false,
      };

    case SET_PERIOD_CALENDAR:
      console.log('this is from set_period_caledar reducer');
      return {
        ...state,
        marks: payload.marked,
        period_calendar: true,
      };

    default:
      return state;
  }
};

export default algorithm;
