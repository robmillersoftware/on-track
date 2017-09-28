// Action constants
export const ACTIVITY_FETCH = 'ACTIVITY_FETCH';
export const ACTIVITY_FETCH_SUCCESS = 'ACTIVITY_FETCH_SUCCESS';
export const ACTIVITY_FETCH_FAILURE = 'ACTIVITY_FETCH_FAILURE';

export const ActivityActions = ActivityService => {
  'ngInject';

  const fetchActivity = () => (dispatch, getState) => {
    const { id } = getState().accounts.current || {};
    dispatch({ type: ACTIVITY_FETCH });
    return ActivityService.getByAccountId(id)
      .then(activity => {
        dispatch({
          type: ACTIVITY_FETCH_SUCCESS,
          payload: activity
        });
      })
      .catch(err => !err.canceled ?
        dispatch({ type: ACTIVITY_FETCH_FAILURE, payload: err }) :
        null);
  };

  return {
    fetchActivity
  };
};
