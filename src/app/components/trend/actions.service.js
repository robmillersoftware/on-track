export const TREND_FETCH = 'TREND_FETCH';
export const TREND_FETCH_SUCCESS = 'TREND_FETCH_SUCCESS';
export const TREND_FETCH_FAILURE = 'TREND_FETCH_FAILURE';

export const TrendActions = TrendService => {
  'ngInject';

  /**
   * Initializes trend data and receives Array of
   * Objects with account number, customer key,
   * month and year data
   */
  const fetchTrend = () => (dispatch) => {
    dispatch({ type: TREND_FETCH });
    return TrendService.getTrend()
      .then(trend =>
        dispatch({
          type: TREND_FETCH_SUCCESS,
          payload: {
            all: trend
          }
        }))
      .catch(err =>
        dispatch({ type: TREND_FETCH_FAILURE, payload: err }));
  };

  return {
    fetchTrend
  };
};
