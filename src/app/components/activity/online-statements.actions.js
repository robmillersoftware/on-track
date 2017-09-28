// Action constants
export const ACCOUNT_FETCH = 'STATEMENTS.ACCOUNT_FETCH';
export const ACCOUNT_FETCH_SUCCESS = 'STATEMENTS.ACCOUNT_FETCH_SUCCESS';
export const ACCOUNT_FETCH_FAILURE = 'STATEMENTS.ACCOUNT_FETCH_FAILURE';
export const STATEMENTS_TOGGLE_YEAR = 'STATEMENTS.STATEMENTS_TOGGLE_YEAR';

export const OnlineStatementsActions = AccountService => {
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

  const toggleYear = year => dispatch => {
    dispatch({
      type: STATEMENTS_TOGGLE_YEAR,
      payload: year
    });
  };

  return {
    fetchAccount,
    toggleYear
  };
};
