import * as actions from './show-routing-info.actions.js';

const initialState = {
  isPasswordVerified: false
};

export const routingInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SHOW_ROUTING_INFO:
      return payload;
    default:
      return state;
  }
};
