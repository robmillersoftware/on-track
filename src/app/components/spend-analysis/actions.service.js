import * as actions from './actions.constants';
import { yearMonthFromDate } from '../../../domain/util';

export const SpendAnalysisActions = SpendAnalysisService => {
  'ngInject';

  const fetchSpendingPreview = () => (dispatch, getState) => {
    dispatch({ type: actions.PREVIEW_FETCH });
    const { current } = getState().accounts;
    return SpendAnalysisService.getPreview(current.id)
      .then(preview =>
        dispatch({
          type: actions.PREVIEW_FETCH_SUCCESS,
          payload: preview
        }))
        .catch(err =>
        dispatch({
          type: actions.PREVIEW_FETCH_FAILURE,
          payload: err
        }));
  };

  const fetchSpendingHistory = () => (dispatch, getState) => {
    dispatch({ type: actions.SPENDING_HISTORY_FETCH });
    const { current } = getState().accounts;
    return SpendAnalysisService.getSpending(current.id)
      .then(spending =>
        dispatch({
          type: actions.SPENDING_HISTORY_FETCH_SUCCESS,
          payload: spending
        }))
      .catch(err =>
        dispatch({
          type: actions.SPENDING_HISTORY_FETCH_FAILURE,
          payload: err
        }));
  };

  const fetchTransactions = yearMonth => (dispatch, getState) => {
    dispatch({ type: actions.TRANSACTIONS_FETCH });
    const { current } = getState().accounts;
    return SpendAnalysisService.getTransactions(current.id, yearMonth)
      .then(transactions =>
        dispatch({
          type: actions.TRANSACTIONS_FETCH_SUCCESS,
          payload: transactions
        }))
      .catch(err =>
        dispatch({ type: actions.TRANSACTIONS_FETCH_FAILURE, payload: err }));
  };

  const fetchCategories = () => (dispatch, getState) => {
    dispatch({ type: actions.CATEGORIES_FETCH });
    const { current } = getState().accounts;
    return SpendAnalysisService.getCategories(current.id)
      .then(categories =>
        dispatch({
          type: actions.CATEGORIES_FETCH_SUCCESS,
          payload: categories
        }))
      .catch(err =>
        dispatch({ type: actions.CATEGORIES_FETCH_FAILURE, payload: err }));
  };

  const selectMonth = yearMonth => (dispatch, getState) => {
    const { spending } = getState().spendAnalysis;
    return dispatch({
      type: actions.SELECT_MONTH,
      payload: {
        ...spending.all[yearMonth]
      }
    });
  };

  const selectCategory = categoryId => dispatch => {
    dispatch({
      type: actions.FILTER_HISTORY,
      payload: {
        categoryId
      }
    });
    dispatch({
      type: actions.FILTER_TRANSACTIONS,
      payload: {
        categoryId
      }
    });
  };

  /**
   * Initializing spend analysis involves fetching the complete
   * spending history then selecting a default month (current month)
   * and then fetching the transactions for that month.
   * This composite action creator combines these actions in sequence.
   */
  const spendAnalysisInit = () => dispatch => {
    const yearMonth = yearMonthFromDate(new Date());
    dispatch({ type: actions.SPEND_ANALYSIS_INIT });
    dispatch(fetchSpendingHistory())
      .then(() => dispatch(selectMonth(yearMonth)))
      .then(() => dispatch(fetchTransactions(yearMonth)))
      .then(() =>
        dispatch({ type: actions.SPEND_ANALYSIS_INIT_COMPLETE }))
      .catch(err =>
        dispatch({ type: actions.SPEND_ANALYSIS_INIT_FAILURE, payload: err }));
  };

  /**
   * TODO: implement this functionality.
   * Should update the category of a transaction and the
   * totals and history areas should update to reflect.
   */
  const setTransactionCategory = () => (dispatch) => {
    dispatch({ type: actions.UPDATE_TRANSACTION });
  };

  const transactionsSort = sortBy => ({
    type: actions.TRANSACTIONS_SORT,
    payload: {
      sortBy
    }
  });

  const transactionsFilter = query => ({
    type: actions.TRANSACTIONS_FILTER,
    payload: {
      query
    }
  });

  return {
    fetchSpendingPreview,
    spendAnalysisInit,
    selectMonth,
    selectCategory,
    fetchSpendingHistory,
    fetchTransactions,
    fetchCategories,
    setTransactionCategory,
    transactionsFilter,
    transactionsSort
  };
};
