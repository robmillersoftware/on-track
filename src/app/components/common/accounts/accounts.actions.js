 /**
 * Fetching the list of CFI accounts.
 */
export const ACCOUNTS_FETCH = 'ACCOUNTS_FETCH';
/**
 * CFI accounts list acquired.
 */
export const ACCOUNTS_FETCH_SUCCESS = 'ACCOUNTS_FETCH_SUCCESS';
/**
 * Unable to get CFI accounts list.
 */
export const ACCOUNTS_FETCH_FAILURE = 'ACCOUNTS_FETCH_FAILURE';
/**
 * Current CFI account changes.
 */
export const ACCOUNT_SET_CURRENT = 'ACCOUNT_SET_CURRENT';

// Action creators service

/**
 * Contains action creators related to CFI accounts.
 * @param {Object} AccountsService The CFI accounts domain service.
 */
export const AccountsActions = AccountsService => {
  'ngInject';

  /**
   * Sets the currently selected account.
   * @param {Object} account The account to be selected.
   */
  const setCurrent = account => ({
    type: ACCOUNT_SET_CURRENT,
    payload: Object.assign({}, account)
  });

  /**
   * Updates the selected account by id.
   * @param {string} accountId The unique id for the account to be selected.
   */
  const setCurrentById = accountId => (dispatch, getState) => {
    const accounts = getState().accounts || { all: [] };
    const account = accounts.all.find(a => a.id === accountId) || {};
    dispatch(setCurrent(account));
  };

  /**
   * Async action creator that requests CFI accounts list while dispatching
   * `ACCOUNTS_FETCH`.
   */
  const getAccounts = () => dispatch => {
    dispatch({ type: ACCOUNTS_FETCH });
    return AccountsService.getAll()
      .then(accounts =>
        dispatch({ type: ACCOUNTS_FETCH_SUCCESS, payload: accounts }))
      .catch(err =>
        dispatch({ type: ACCOUNTS_FETCH_FAILURE, payload: err }));
  };

  /**
   * Async action creator that requests CFI accounts list, dispatching
   *  `ACCOUNTS_FETCH`, and selecting a default account on success.
   * @param {string} defaultAccountId The id of the account to select by
   *  default.
   */
  const getAccountsWithDefault = defaultAccountId => dispatch =>
    dispatch(getAccounts())
      .then(() =>
        dispatch(setCurrentById(defaultAccountId)));

  return {
    getAccounts,
    getAccountsWithDefault,
    setCurrent,
    setCurrentById
  };
};
