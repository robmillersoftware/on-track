// Action constants
export const ENTITLEMENTS_FETCH = 'ENTITLEMENTS_FETCH';
export const ENTITLEMENTS_FETCH_SUCCESS = 'ENTITLEMENTS_FETCH_SUCCESS';
export const ENTITLEMENTS_FETCH_FAILURE = 'ENTITLEMENTS_FETCH_FAILURE';

export const EntitlementsActions = EntitlementsService => {
  'ngInject';

  const fetchEntitlements = () => dispatch => {
    dispatch({ type: ENTITLEMENTS_FETCH });
    return EntitlementsService.get()
      .then(entitlements => {
        dispatch({
          type: ENTITLEMENTS_FETCH_SUCCESS,
          payload: entitlements
        });
      })
      .catch(err => !err.canceled ?
        dispatch({ type: ENTITLEMENTS_FETCH_FAILURE, payload: err }) :
        null);
  };

  return {
    fetchEntitlements
  };
};
