import { trendResource, trendsMap } from './maps/TrendPlannerRequest';

export default class Trend {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  getTrend() {
    const options = {
      retry: 2,
      cache: true,
      cacheExpire: 1480000
    };
    return this._http.get(trendResource, options)
      .then(({ data }) => trendsMap(data));
  }

}
