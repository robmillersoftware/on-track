import * as reducers from './accounts.reducers.js';

let defaultAction;
let before;
const initialState = {
  all: [],
  current: null,
  isHydrated: false,
  isFetching: false
};

describe('Accounts Reducers', () => {
  beforeEach(() => {
    defaultAction = { type: 'Not a valid action type' };
    before = reducers.accounts(undefined, defaultAction);
  });

  it('Default', () => {
    expect(before).toEqual(initialState);
  });

  it('ACCOUNTS_FETCH', () => {
    const acct = reducers.accounts(before, { type: 'ACCOUNTS_FETCH' });
    const expected = {
      all: [],
      current: null,
      isHydrated: false,
      isFetching: true
    };

    expect(before).toEqual(initialState);
    expect(acct).toEqual(expected);
  });

  it('ACCOUNTS_FETCH_SUCCESS', () => {
    const accounts = [1, 2, 3, 4, 5];
    const fetchSuccessAction = { type: 'ACCOUNTS_FETCH_SUCCESS',
      payload: accounts };
    const acct = reducers.accounts(before, fetchSuccessAction);
    const expected = {
      all: accounts,
      current: null,
      isHydrated: true,
      isFetching: false
    };

    expect(before).toEqual(initialState);
    expect(acct).toEqual(expected);
  });

  it('ACCOUNTS_FETCH_FAILURE', () => {
    const error = 'Error!';
    const fetchFailureAction = { type: 'ACCOUNTS_FETCH_FAILURE',
      payload: error };
    const acct = reducers.accounts(before, fetchFailureAction);
    const expected = {
      all: [],
      current: null,
      isHydrated: false,
      isFetching: false,
      error
    };

    expect(before).toEqual(initialState);
    expect(acct).toEqual(expected);
  });
});
