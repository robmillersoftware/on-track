// Action constants
export const ACTIVITY_VIEW_SET_LIST = 'ACTIVITY_VIEW_FETCH_SUCCESS';
export const ACTIVITY_VIEW_FILTER_CHANGE = 'ACTIVITY_VIEW_FILTER_CHANGE';
export const ACTIVITY_VIEW_SORT_CHANGE = 'ACTIVITY_VIEW_SORT_CHANGE';
export const ACTIVITY_VIEW_SHOW_NUMBER = 'ACTIVITY_VIEW_SHOW_NUMBER';
export const ACTIVITY_VIEW_LOAD_MORE = 'ACTIVITY_VIEW_LOAD_MORE';
export const ACTIVITY_VIEW_TOGGLE_ADVANCED = 'ACTIVITY_VIEW_TOGGLE_ADVANCED';

export const ActivityViewActions = TransactionsService => {
  'ngInject';

  const setList = list => (dispatch, getState) => {
    const criteria = getState().viewActivity.sort;
    dispatch({
      type: ACTIVITY_VIEW_SET_LIST,
      payload: TransactionsService.sort(list, criteria)
    });
  };

  /**
   * Filters activity transactions by taking user-entered query and
   * existing transactions and calling the service with the data.
   * @param {Object} filters The query the user is searching by.
   * @param {Object} transactions The existing activity on the account.
   */
  const filterActivity = (filters, transactions) => (dispatch, getState) => {
    let list = transactions;
    if (!list) {
      list = getState().activity.transactions;
    }
    list = TransactionsService.filter(list, filters);
    list = TransactionsService.sort(list, getState().viewActivity.sort);

    dispatch({
      type: ACTIVITY_VIEW_FILTER_CHANGE,
      payload: {
        filter: filters,
        list
      }
    });
  };

  /**
   * Sorts data based on passed criteria
   * @param {Object} criteria How the data should be sorted.
   */
  const sortActivity = (criteria, transactions) => (dispatch, getState) => {
    let list = transactions;
    if (!list) {
      list = getState().viewActivity.list;
    }
    list = TransactionsService.sort(list, criteria);

    dispatch({
      type: ACTIVITY_VIEW_SORT_CHANGE,
      payload: {
        criteria,
        list
      }
    });
  };

  /**
   * Sets number of rows showing in table
   * @param {string} num How many transactions show.
   */
  const setNumberShowing = num => dispatch => {
    dispatch({
      type: ACTIVITY_VIEW_SHOW_NUMBER,
      payload: num
    });
  };

  /**
   * Loads additional activity
   * @param {string} num Additional transactions that show.
   */
  const loadMore = num => dispatch => {
    dispatch({
      type: ACTIVITY_VIEW_LOAD_MORE,
      payload: num
    });
  };

  /**
   * toggles to show/hide advanced search
   */
  const toggleAdvancedSearch = () => dispatch => {
    dispatch({
      type: ACTIVITY_VIEW_TOGGLE_ADVANCED
    });
  };

  return {
    setList,
    filterActivity,
    sortActivity,
    setNumberShowing,
    loadMore,
    toggleAdvancedSearch
  };
};
