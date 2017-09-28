import * as actions from './accounts.actions';

const initialState = {
  all: [],
  current: null,
  isHydrated: false,
  isFetching: false
};

export const accounts = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ACCOUNTS_FETCH:
      return Object.assign({}, state, {
        isHydrated: false,
        isFetching: true
      });
    case actions.ACCOUNTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        all: payload,
        isHydrated: true,
        isFetching: false
      });
    case actions.ACCOUNTS_FETCH_FAILURE:
      return Object.assign({}, state, {
        isHydrated: false,
        isFetching: false,
        error: payload
      });
    case actions.ACCOUNT_SET_CURRENT:
      return Object.assign({}, state, { current: payload });
    default:
      return state;
  }
};
