import * as actions from './entitlements.actions';

const initialState = {
  fetching: false,
  error: undefined
};

export const entitlements = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ENTITLEMENTS_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ENTITLEMENTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetching: false
      }, payload);

    case actions.ENTITLEMENTS_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    default:
      return state;
  }
};
