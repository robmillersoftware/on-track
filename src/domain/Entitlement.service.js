import { entitlementResource, entitlementMap }
  from './maps/EntitlementRequest';

export default class Entitlements {
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
    return this._http.get(entitlementResource, options)
      .then(({ data }) => entitlementMap(data));
  }
}
