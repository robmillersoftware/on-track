import * as actions from './bill-dot-com-access.actions';

const initialState = {
  active: null,
  enrolled: null,
  fetching: false,
  error: undefined
};

export const entitlements = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ACCESS_FETCH:
      return Object.assign({}, state, {
        fetching: true,
        error: undefined
      });

    case actions.ACCESS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        active: payload.active,
        enrolled: payload.enrolled,
        fetching: false
      });

    case actions.ACCESS_FETCH_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      });

    default:
      return state;
  }
};
