import moment from 'moment';
import { setPlanAPI } from '@/api';

export const START_ALGORITHM = 'start-algorithm';
export const SET_PLAN_FAILED = 'set-plan-failed';
export const SET_PLAN_REQUEST = 'set-plan-request';
export const SET_PLAN_SUCCESS = 'set-plan-success';
export const SET_PERIOD_CALENDAR = 'set-period-calendar';
export const SET_PERIOD_CALCULATOR_DETAILS = 'set-period-calculator-details';

export function setPlanRequest(plan) {
  return {
    type: SET_PLAN_REQUEST,
    payload: { plan },
  };
}

export function setPlanSuccess(plan) {
  return {
    type: SET_PLAN_SUCCESS,
    payload: { plan },
  };
}

export function setPlanFailed() {
  return {
    type: SET_PLAN_FAILED,
    payload: {},
  };
}

export function setPlan(plan) {
  return (dispatch) => {
    dispatch(setPlanRequest(plan));
    return setPlanAPI(plan)
      .then(({ data }) => {
        dispatch(setPlanSuccess(data));
      })
      .catch((error) => {
        dispatch(setPlanFailed());
      });
  };
}

function calculatePeriods(cycle, period, last) {
  const periods = {};
  for (let i = 0; i < period; i += 1) {
    const d = moment(last).add(i, 'days').format('YYYY-MM-DD');
    const n = moment(last).add(cycle + period + i, 'days').format('YYYY-MM-DD');
    const n2 = moment(last).add((cycle * 2) + (2 * period) + i, 'days').format('YYYY-MM-DD');
    const p = moment(last).subtract(cycle + i, 'days').format('YYYY-MM-DD');
    if (i === period - 1) {
      periods[d] = { endingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[p] = { startingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[n] = { endingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[n2] = { endingDay: true, color: '#f4507c', textColor: '#ffffff' };
      continue;
    }
    if (i === 0) {
      periods[d] = { startingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[p] = { endingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[n] = { startingDay: true, color: '#f4507c', textColor: '#ffffff' };
      periods[n2] = { startingDay: true, color: '#f4507c', textColor: '#ffffff' };
      continue;
    }
    periods[d] = { color: '#f4507c', textColor: '#ffffff' };
    periods[p] = { color: '#f4507c', textColor: '#ffffff' };
    periods[n] = { color: '#f4507c', textColor: '#ffffff' };
    periods[n2] = { color: '#f4507c', textColor: '#ffffff' };
  }
  return periods;
}

function calculateFertilePeriods(cycle, period, last) {
  const fertile = {};
  for (let i = 0; i < 11; i += 1) {
    const d = moment(last).subtract(20 - period - i, 'days').format('YYYY-MM-DD');
    const n = moment(last)
      .add(cycle + period, 'days')
      .subtract(20 - period - i, 'days')
      .format('YYYY-MM-DD');
    const n2 = moment(last)
      .add((cycle * 2) + (2 * period), 'days')
      .subtract(20 - period - i, 'days')
      .format('YYYY-MM-DD');
    if (i === 10) {
      fertile[d] = { endingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      fertile[n] = { endingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      fertile[n2] = { endingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      continue;
    }
    if (i === 0) {
      fertile[d] = { startingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      fertile[n] = { startingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      fertile[n2] = { startingDay: true, color: '#D8A7CB', textColor: '#F9F9F9' };
      continue;
    }
    fertile[d] = { color: '#D8A7CB', textColor: '#F9F9F9' };
    fertile[n] = { color: '#D8A7CB', textColor: '#F9F9F9' };
    fertile[n2] = { color: '#D8A7CB', textColor: '#F9F9F9' };
  }
  return fertile;
}

export function setPeriodCalculatorDetails(details) {
  return (dispatch) => {
    dispatch({
      type: SET_PERIOD_CALCULATOR_DETAILS,
      payload: { details },
    });
    if (details.cycle_length === '' || details.cycle_length === null) {
      return null;
    }
    if (details.period_length === '' || details.period_length === null) {
      return null;
    }
    if (details.last_period_started_at === '' || details.last_period_started_at === null) {
      return null;
    }
    const periods = calculatePeriods(
      parseInt(details.cycle_length, 10),
      parseInt(details.period_length, 10),
      details.last_period_started_at,
    );
    const fertilePeriods = calculateFertilePeriods(
      parseInt(details.cycle_length, 10),
      parseInt(details.period_length, 10),
      details.last_period_started_at,
    );
    dispatch({
      type: SET_PERIOD_CALENDAR,
      payload: { marked: { ...fertilePeriods, ...periods } },
    });
  };
}

export function startAlgorithm() {
  return {
    type: START_ALGORITHM,
    payload: {},
  };
}

export function getHumanPlan(plan) {
  switch (plan) {
    case 'WITHDRAWAL_METHOD':
      return 'Withdrawal Method';

    case 'FERTILE_PERIOD_MONITOR':
      return 'Fertile Periods Monitor';

    case 'MALE_BARRIER':
      return 'Use Of Male Condoms';

    case 'MALE_VASECTOMY':
      return 'Vasectomy';

    case 'COMBINED_ORAL':
      return 'Combined Oral Contraceptive (A.K.A Birth Control Pill)';

    case 'PROGESTOGEN_ONLY':
      return 'Progestogen Only Pills';

    case 'COMBINED_PATCHES':
      return 'Combined Hormonal Patches and Vaginal Rings';

    default:
      return 'Unknown method';
  }
}
