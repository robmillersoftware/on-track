import template from './account-summary.html';

/**
 * Container component for account summary.
 * Contains passed account data.
 */
export const accountSummaryComponent = {
  template,
  bindings: {
    account: '<'
  }
};
