// Action constants
export const CASHFLOW_FETCH = 'TIMELINE.CASHFLOW_FETCH';
export const CASHFLOW_FETCH_SUCCESS = 'TIMELINE.CASHFLOW_FETCH_SUCCESS';
export const CASHFLOW_FETCH_FAILURE = 'TIMELINE.CASHFLOW_FETCH_FAILURE';

export const CASHFLOW_FILTER_SELECTED = 'TIMELINE.CASHFLOW_FILTER_SELECTED';

/**
 */
export const TimelineActions = (CashflowService, TransactionsService) => {
  'ngInject';

  /**
   * Search timeline cashflow transactions.
   */
  const searchTransactions = () => (dispatch, getState) => {
    const { cashflow } = getState().timeline;
    dispatch({
      type: CASHFLOW_FILTER_SELECTED,
      payload: TransactionsService.search(cashflow.transactions.all,
        cashflow.options.query)
    });
  };

  /**
   * Sorts cashflow transactions.
   */
  const sortTransactions = () => (dispatch, getState) => {
    const { cashflow } = getState().timeline;
    const sort = cashflow.options.sort;

    let field = 'date';
    field = (sort.substr(0, 8) === 'Due Date') ? 'dueDate' : field;
    field = (sort.substr(0, 11) === 'Description') ? 'description' : field;
    field = (sort.substr(0, 7) === 'Cash In') ? 'deposit' : field;
    field = (sort.substr(0, 8) === 'Cash Out') ? 'withdrawal' : field;
    const direction = (sort.substr(-9) === 'Ascending') ? 1 : -1;

    dispatch({
      type: CASHFLOW_FILTER_SELECTED,
      payload: TransactionsService.sort(cashflow.transactions.all, {
        field,
        direction
      })
    });
  };

  /**
   * Fetches cashflow data from the API.
   */
  const getCashflow = () => (dispatch, getState) => {
    const accountId = getState().accounts.current.id;
    dispatch({ type: CASHFLOW_FETCH });
    return CashflowService.getByAccountId(accountId)
      .then(timeline => dispatch({
        type: CASHFLOW_FETCH_SUCCESS,
        payload: timeline
      }))
      .catch(err =>
        dispatch({ type: CASHFLOW_FETCH_FAILURE, payload: err }));
  };

  return {
    getCashflow,
    searchTransactions,
    sortTransactions
  };
};
