import template from './transactions-by-date.html';

export const transactionsByDateComponent = {
  template,
  bindings: {
    transactionsByDate: '<',
    limitTo: '<?'
  }
};
