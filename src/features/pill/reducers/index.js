import moment from 'moment';
import {
  START_PILL_REMINDER,
  UPDATE_REMINDER_TIME,
  CANCEL_PILL_REMINDER,
} from '../actions';

const INIT_STATE = {
  set_at: null,
  cancelled_at: null,
  next_reminder_time: null,
};

const reminder = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case START_PILL_REMINDER:
      return {
        set_at: moment().format(),
        next_reminder_time: moment().add(1, 'days').format(),
      };

    case UPDATE_REMINDER_TIME:
      return {
        ...state,
        next_reminder_time: payload.time,
      };

    case CANCEL_PILL_REMINDER:
      return {
        ...state,
        set_at: null,
        cancelled_at: moment().format(),
      };

    default:
      return state;
  }
};

export default reminder;
