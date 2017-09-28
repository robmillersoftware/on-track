
export const MobileActions = (
  ActivityActions,
  TimelineActions,
  TrendActions,
  /* DailyTrackerActions,*/
  SpendAnalysisActions) => {
  'ngInject';

  const loadDashboard = () => (dispatch) =>
    dispatch(TimelineActions.getCashflow())
      /* .then(() => dispatch(DailyTrackerActions.fetchTrackerPreview()))*/
      .then(() => dispatch(TrendActions.fetchTrend()))
      .then(() => dispatch(SpendAnalysisActions.fetchSpendingPreview()))
      .then(() => dispatch(ActivityActions.fetchActivity()));

  return {
    loadDashboard
  };
};
