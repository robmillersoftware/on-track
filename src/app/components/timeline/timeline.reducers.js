import { combineReducers } from 'redux';
import * as actions from './timeline.actions';

const account = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.CASHFLOW_FETCH:
      return { isFetching: true };
    case actions.CASHFLOW_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...payload.account,
        isFetching: false,
        isHydrated: true
      });
    case actions.CASHFLOW_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isHydrated: false,
        error: payload
      });
    default:
      return state;
  }
};

const initialState = {
  all: [],
  selected: [],
  options: {},
  isFetching: false,
  isHydrated: false
};

const cashflow = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CASHFLOW_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.CASHFLOW_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...payload.cashflow,
        isFetching: false,
        isHydrated: true
      });
    case actions.CASHFLOW_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isHydrated: false,
        error: payload
      });
    case actions.CASHFLOW_FILTER_SELECTED:
      return Object.assign({}, state, {
        transactions: Object.assign({}, {
          all: state.transactions.all,
          selected: payload
        })
      });
    default:
      return state;
  }
};

const isInitialized = (state = false, { type }) => {
  switch (type) {
    case actions.CASHFLOW_FETCH_SUCCESS:
      return true;
    case actions.CASHFLOW_FETCH_FAILURE:
      return false;
    default:
      return state;
  }
};

export const timeline = combineReducers({
  account,
  cashflow,
  isInitialized
});
