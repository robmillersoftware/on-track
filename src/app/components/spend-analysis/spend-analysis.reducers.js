import * as actions from './actions.constants';
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

const spending = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SPENDING_HISTORY_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.SPENDING_HISTORY_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...payload,
        isFetching: false,
        isHydrated: true
      });
    case actions.SPENDING_HISTORY_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: payload
      });
    case actions.SELECT_MONTH:
      return Object.assign({}, state, {
        selected: payload
      });
    case actions.FILTER_HISTORY:
      return Object.assign({}, state, {
        filter: payload
      });
    default:
      return state;
  }
};

const transactions = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.TRANSACTIONS_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.TRANSACTIONS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        all: payload,
        isFetching: false,
        isHydrated: true
      });
    case actions.TRANSACTIONS_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: payload
      });
    case actions.TRANSACTIONS_SORT:
      return Object.assign({}, state, {
        options: Object.assign({}, state.options || {}, payload)
      });
    case actions.TRANSACTIONS_FILTER:
      return Object.assign({}, state, {
        options: Object.assign({}, state.options || {}, payload)
      });
    default:
      return state;
  }
};

const categories = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CATEGORIES_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.CATEGORIES_FETCH_SUCCESS:
      return Object.assign({}, state, {
        all: payload,
        isFetching: false,
        isHydrated: true
      });
    case actions.CATEGORIES_FETCH_FAILURE:
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
    case actions.SPEND_ANALYSIS_INIT_COMPLETE:
      return true;
    case actions.SPEND_ANALYSIS_INIT_FAILURE:
      return false;
    default:
      return state;
  }
};

export const spendAnalysis = combineReducers({
  preview,
  isInitialized,
  spending,
  transactions,
  categories
});
