import {
  resources, transactionsMap, categoriesMap, spendingMap, spendingHistoryMap
} from './maps/SpendAnalysisRequests';
import {
  categoryListMap,
  spendPreviewResource
} from './maps/SpendAnalysisQuickviewRequest';

export default class SpendAnalysis {
  constructor(_http) {
    'ngInject';
    this._http = _http;
  }

  /**
   * Gets list of all categories applicable over past year, inclulding
   * current month.
   * Used by category selector when recategorizing a transaction.
   * @param {string} accountId The ID of the account to represent.
   * @return {Object[]} Array of Spend Analysis category objects.
   */
  getCategories(accountId) {
    const options = {
      retry: 2,
      cache: true,
      cacheExpire: 9480000,
      params: {
        account: accountId
      }
    };
    return this._http.get(resources.categories, options)
      .then(({ data }) => categoriesMap(data));
  }

  /**
   * Gets list of spend analysis (i.e., with categories) transactions
   * for month and year.
   * @param {string} accountId The ID of the account to reference.
   * @param {number} year The year to select transactions from.
   * @param {number} month The month from which to get transactions.
   * @return {Object[]} An array of spend analysis transactions.
   */
  getTransactions(accountId, yearMonth) {
    const options = {
      retry: 2,
      params: {
        account: accountId,
        yearMonth
      }
    };
    return this._http.get(resources.transactions, options)
      .then(({ data }) => transactionsMap(data));
  }

  /**
   * Gets the complete spending history (over supported interval) grouped
   * by yearMonth and category, as well as the mapped and reduced totals
   * by month-category for the overview.
   * @param {string} accountId The ID of the pertinent account.
   * @return {Object} Object containing the entire spending history
   * by category as well as the history transformed for high-level overview.
   */
  getSpending(accountId) {
    const options = {
      retry: 2,
      params: {
        account: accountId
      }
    };
    return this._http.get(resources.spending, options)
      .then(({ data }) => {
        const all = spendingMap(data);
        const history = spendingHistoryMap(all);
        this.spending = {
          accountId,
          data: {
            all,
            history
          }
        };
        return this.spending.data;
      });
  }

  /**
   * Gets the spend analysis preview data. (Used on dashboard.)
   * @param {string} accountId The ID of the pertinent account.
   * @return {Object[]} The top three spending categories with summary data.
   */
  getPreview(accountId) {
    const options = {
      retry: 2,
      params: {
        account: accountId
      }
    };
    return this._http.get(spendPreviewResource, options)
      .then(({ data }) =>
        data.categoryList.map(categoryListMap));
  }

  // TODO: should post to spend transaction recategorization endpoint
  // args: accountId, transactionId, yearMonth, categoryId
  updateCategory() {}
}
