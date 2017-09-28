import { accountsResource, accountsMap } from './maps/AccountSwitcherRequest';

export default class Accounts {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  /**
   * Gets all accounts data.
   * @return {Object[]} An array of accounts objects
   */
  getAll() {
    const options = {
      cache: true,
      cacheExpire: 480000,
      retry: 2
    };
    return this._http.get(accountsResource, options)
      .then(({ data }) => accountsMap(data));
  }
}
