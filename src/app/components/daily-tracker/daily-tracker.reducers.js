import * as actions from './daily-tracker.actions';
import { combineReducers } from 'redux';

const initialState = {
  isFetching: false,
  isHydrated: false,
  error: undefined
};

const preview = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PREVIEW_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.PREVIEW_FETCH_SUCCESS:
      return Object.assign({}, state, {
        totals: payload,
        isFetching: false,
        isHydrated: true
      });
    case actions.PREVIEW_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: payload
      });
    default:
      return state;
  }
};

const isInitialized = (state = false, { type }) => {
  switch (type) {
    case actions.DAILY_TRACKER_INIT_COMPLETE:
      return true;
    case actions.DAILY_TRACKER_INIT_FAILURE:
      return false;
    default:
      return state;
  }
};

export const dailyTracker = combineReducers({
  preview,
  isInitialized,
});
