import * as actions from './app.actions';
import {
  ACCOUNTS_FETCH_SUCCESS,
  ACCOUNTS_FETCH_FAILURE
} from './components/common/accounts/accounts.actions';

const initialState = {
  // for default account selection and also may be useful when
  // return to OLB
  initialAccountId: '',
  // stores logged-in user data
  user: {},
  // true when app data is ready
  isHydrated: false
};

export const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.APP_SET_INITIAL_ACCOUNT_ID:
      return Object.assign({}, state, { initialAccountId: payload });
    case ACCOUNTS_FETCH_SUCCESS:
      return Object.assign({}, state, { isHydrated: true });
    case ACCOUNTS_FETCH_FAILURE:
      return Object.assign({}, state, {
        isHydrated: false,
        failure: true
      });
    default:
      return state;
  }
};
