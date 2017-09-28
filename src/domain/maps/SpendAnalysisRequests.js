import { combineCategories } from './SpendAnalysisCatListRequest';
import {
  transactionYearMonthMap,
  totalsFromSpending
} from './SpendAnalysisCatSummaryRequest';
import { transactionMap } from './SpendAnalysisCatTransRequest';

/**
 * Aggregate resource definition for Spend Analysis endpoints.
 */
export const resources = {
  /**
   * Category hierarchy by selection menu when changing a transaction
   * category.
   */
  categories: '/VcfoSpendAnalysisCatListRequest',
  /**
   * The complete spending history, by category, over the Spend Analysys
   * period (12 months at time of writing).
   */
  spending: '/VcfoSpendAnalysisCatSummaryRequest',
  /**
   * The list of transactions, with category info, for the selected month.
   */
  transactions: '/VcfoSpendAnalysisCatTransRequest',
  /**
   * Updates the category of a transactions.
   * GET with x-www-form-urlencoded query string params.
   */
  recategorize: '/VcfoSpendAnalysisCatRecategorizeTransactionRequest'
};

/**
 * Maps categories tree DTO to domain model.
 * @param {Object} dto The SpendAnalysisCatListRequest DTO to transform.
 * @return {Object} Transformed categories data.
 */
export const categoriesMap = dto =>
  dto.vcfoSpendAccountCatListDetailsDataList.map(combineCategories);

/**
 * Maps spending DTO to domain model.
 * @param {Object} dto The SpendAnalysisCatSummaryRequest DTO to transform.
 * @return {Object} Transformed spending data.
 */
export const spendingMap = dto =>
  transactionYearMonthMap(dto.accountTransactionByYearMonth);

/**
 * Maps spend history transaction DTO to domain model.
 * @param {Object} dto The SpendAnalysisCatTransRequest DTO to transform.
 * @return {Object} Transformed transactions data.
 */
export const transactionsMap = dto =>
  dto.listTransactions.map(transactionMap);

/**
 * Transforms complete spending history (transactions) graph into
 * spending history summary list. Full time series for all categories
 * that have spending. Used by Spending History chart.
 * @param {Object} spending The spending graph as returned by
 *  `transactionsMap`.
 * @return {Array} Flat list of spending history summary data.
 */
export const spendingHistoryMap = spending =>
  totalsFromSpending(spending);
