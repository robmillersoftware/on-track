// Action constants
export const ACCOUNT_FETCH = 'ACCOUNT_FETCH';
export const ACCOUNT_FETCH_SUCCESS = 'ACCOUNT_FETCH_SUCCESS';
export const ACCOUNT_FETCH_FAILURE = 'ACCOUNT_FETCH_FAILURE';

export const AccountActions = AccountService => {
  'ngInject';

  const fetchAccount = () => dispatch => {
    dispatch({ type: ACCOUNT_FETCH });
    return AccountService.get()
      .then(account => {
        dispatch({
          type: ACCOUNT_FETCH_SUCCESS,
          payload: account
        });
      })
      .catch(err => !err.canceled ?
        dispatch({ type: ACCOUNT_FETCH_FAILURE, payload: err }) :
        null);
  };

  return {
    fetchAccount
  };
};
