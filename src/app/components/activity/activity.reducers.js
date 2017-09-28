import * as actions from './activity.actions';

const initialState = {
  account: {},
  transactions: [],
  fetching: false
};

export const activity = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ACTIVITY_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ACTIVITY_FETCH_SUCCESS:
      return Object.assign({}, state, {
        account: payload.account,
        transactions: payload.transactions.slice(0),
        fetching: false
      });

    case actions.ACTIVITY_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    default:
      return state;
  }
};
