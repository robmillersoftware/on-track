import { combineReducers } from 'redux';
import * as actions from './dashboard.actions';

const detailInitial = {
  isActive: false,
  tab: 'activity'
};

const detail = (state = detailInitial, { type, payload }) => {
  switch (type) {
    case actions.DETAIL_VIEW_TAB_CHANGE:
    case actions.DETAIL_VIEW_ACTIVATE:
    case actions.DETAIL_VIEW_DEACTIVATE:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};

export const dashboard = combineReducers({ detail });
