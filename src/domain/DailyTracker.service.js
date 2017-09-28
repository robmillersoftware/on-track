import { dailyTrackerPreviewResource, dailyTrackerMap } from
  './maps/DailyTrackerRequests';

export default class DailyTracker {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  /**
   * Gets the daily tracker preview data. (Used on dashboard.)
   * @param {string} accountId The ID of the pertinent account.
   * @return {Object[]} TODO
   */
  getTrackerData(accountId) {
    const options = {
      retry: 2,
      params: {
        account: accountId
      }
    };
    return this._http.get(dailyTrackerPreviewResource, options)
      .then(({ data }) => dailyTrackerMap(data));
  }
}
