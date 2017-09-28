import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './accounts.actions.js';

const mockStore = configureMockStore([thunk]);
const mockService = {
  getAll: () => new Promise((resolve) => {
    resolve({});
  })
};
let accountsActions;

describe('Account Action Creators', () => {
  beforeEach(() => {
    accountsActions = new actions.AccountsActions(mockService);
  });

  it('setCurrent', () => {
    const store = mockStore({});
    const acct = { msg: 'Account info' };
    const expectedActions = [
      actions.ACCOUNT_SET_CURRENT
    ];

    store.dispatch(accountsActions.setCurrent(acct));
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('setCurrentById', () => {
    const store = mockStore({});
    const expectedActions = [
      actions.ACCOUNT_SET_CURRENT
    ];

    store.dispatch(accountsActions.setCurrentById(0));
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('getAccounts', done => {
    const store = mockStore({});
    const expectedActions = [
      actions.ACCOUNTS_FETCH,
      actions.ACCOUNTS_FETCH_SUCCESS
    ];

    store.dispatch(accountsActions.getAccounts());
    setTimeout(() => {
      const actualActions = store.getActions().map(action => action.type);
      done();
      expect(actualActions).toEqual(expectedActions);
    }, 100);
  });

  it('getAccountsWithDefault', done => {
    const store = mockStore({});
    const expectedActions = [
      actions.ACCOUNTS_FETCH,
      actions.ACCOUNTS_FETCH_SUCCESS,
      actions.ACCOUNT_SET_CURRENT
    ];

    store.dispatch(accountsActions.getAccountsWithDefault(0));
    setTimeout(() => {
      const actualActions = store.getActions().map(action => action.type);
      done();
      expect(actualActions).toEqual(expectedActions);
    }, 100);
  });
});
