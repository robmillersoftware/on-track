export const PREVIEW_FETCH = 'TRACKER.PREVIEW_FETCH';
export const PREVIEW_FETCH_SUCCESS = 'TRACKER.PREVIEW_FETCH_SUCCESS';
export const PREVIEW_FETCH_FAILURE = 'TRACKER.PREVIEW_FETCH_FAILURE';

export const DailyTrackerActions = DailyTrackerService => {
  'ngInject';

  const fetchDailyTrackerPreview = () => (dispatch, getState) => {
    dispatch({ type: PREVIEW_FETCH });
    const { current } = getState().accounts;
    return DailyTrackerService.getPreview(current.id)
      .then(preview =>
        dispatch({
          type: PREVIEW_FETCH_SUCCESS,
          payload: preview
        }))
        .catch(err =>
        dispatch({
          type: PREVIEW_FETCH_FAILURE,
          payload: err
        }));
  };

  return {
    fetchDailyTrackerPreview
  };
};
