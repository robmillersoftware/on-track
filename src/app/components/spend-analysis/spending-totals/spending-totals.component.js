import template from './spending-totals.html';

export const spendingTotalsComponent = {
  template,
  bindings: {
    spending: '<',
    onSelectCategory: '&'
  }
};
