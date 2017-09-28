import { cashflowResource, cashflowMap } from './maps/Cashflow';

export default class Cashflow {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  /**
   * Gets cashflow data based on id.
   * @param accountId - The id used to grab full cashflow data.
   * @return {Object[]} An array of cashflow objects that match
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
    return this._http.get(cashflowResource, options)
      .then(({ data }) => cashflowMap(data));
  }
}
