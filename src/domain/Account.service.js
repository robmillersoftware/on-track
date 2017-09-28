import { activityResource, activityMap } from './maps/DepositActivity';

export default class Account {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  get() {
    const options = {
      cache: true,
      cacheExpire: 480000,
      retry: 2
    };
    return this._http.get(activityResource, options)
      .then(({ data }) => activityMap(data));
  }
}
