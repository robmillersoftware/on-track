import template from './transactions.html';

export const transactionsComponent = {
  template,
  bindings: {
    transactions: '<',
    options: '<',
    onSortChange: '&',
    onSearch: '&'
  }
};
