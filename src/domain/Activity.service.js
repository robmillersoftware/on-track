import { activityResource, activityMap } from './maps/DepositActivity';

export default class Activity {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  /**
   * Gets activity data based on account id.
   * @param accountId - The id used to grab full activity data.
   * @return {Object[]} An array of activity objects that match
   * the provided query.
   */
  getByAccountId(accountId) {
    const options = {
      cache: true,
      cacheExpire: 240000,
      cancelPending: true,
      retry: 1,
      params: {
        vcfoAccountId: accountId
      }
    };
    return this._http.get(activityResource, options)
      .then(({ data }) => activityMap(data));
  }
}
