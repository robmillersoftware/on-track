import template from './transactions-table.html';

/**
 * Transactions table component. Shows passed
 * transactions data
 */
export const transactionsTableComponent = {
  template,
  bindings: {
    transactions: '<',
    total: '<?',
    showBalance: '<?',
    showMore: '<?',
    limitTo: '<?',
    incrementBy: '<?'
  }
};
