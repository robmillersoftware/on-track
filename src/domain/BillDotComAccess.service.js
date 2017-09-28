import { billDotComAccessResource, billDotComAccessMap }
  from './maps/BillDotComControllerRequest';

export default class BillDotComAccess {
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
    return this._http.get(billDotComAccessResource, options)
      .then(({ data }) => billDotComAccessMap(data));
  }
}
