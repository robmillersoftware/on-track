import * as actions from './actions.service';

const initialState = {
  isFetching: false,
  isHydrated: false,
  error: undefined
};

export const trend = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.TREND_FETCH:
      return Object.assign({}, initialState, {
        isFetching: true
      });
    case actions.TREND_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...payload,
        isFetching: false,
        isHydrated: true
      });
    case actions.TREND_FETCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: payload
      });
    default:
      return state;
  }
};
