import * as actions from './account.actions';

const initialState = {
  info: {},
  fetching: false,
  error: undefined
};

export const account = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ACCOUNT_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ACCOUNT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        info: payload.account,
        fetching: false
      });

    case actions.ACCOUNT_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    default:
      return state;
  }
};
