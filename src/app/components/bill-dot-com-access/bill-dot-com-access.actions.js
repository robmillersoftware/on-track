// Action constants
export const ACCESS_FETCH = 'BILLDOTCOM.ACCESS_FETCH';
export const ACCESS_FETCH_SUCCESS = 'BILLDOTCOM.ACCESS_FETCH_SUCCESS';
export const ACCESS_FETCH_FAILURE = 'BILLDOTCOM.ACCESS_FETCH_FAILURE';

export const BillDotComAccessActions = BillDotComAccessService => {
  'ngInject';

  const fetchEntitlements = () => dispatch => {
    dispatch({ type: ACCESS_FETCH });
    return BillDotComAccessService.get()
      .then(entitlements => {
        dispatch({
          type: ACCESS_FETCH_SUCCESS,
          payload: entitlements
        });
      })
      .catch(err => !err.canceled ?
        dispatch({ type: ACCESS_FETCH_FAILURE, payload: err }) :
        null);
  };

  return {
    fetchEntitlements
  };
};
