import template from './searchable-transactions.html';
import controller from './searchable-transactions.controller';

/**
 * Searchable transactions container component. Contains
 * transactions table and tools components.
 */
export const searchableTransactionsComponent = {
  template,
  controller,
  bindings: {
    transactions: '<',
    limitTo: '<?',
    incrementBy: '<?'
  }
};
