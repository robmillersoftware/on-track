import * as actions from './settings.actions';

const initialState = {
  defaultAccount: {},
  allAccounts: []
};

export const settings = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SETTINGS_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.SETTINGS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        sfaAccount: payload.sfaAccount,
        allAccounts: payload.allAccounts,
        fetching: false
      });

    case actions.SETTINGS_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    default:
      return state;
  }
};
