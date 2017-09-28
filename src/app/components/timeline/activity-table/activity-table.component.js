import template from './activity-table.html';

/**
 * Activity table component. Contains table of
 * transactions.
 */
export const activityTableComponent = {
  template,
  bindings: {
    transactions: '<'
  }
};
