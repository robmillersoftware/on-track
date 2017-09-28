import template from './account-number-detail.html';

/**
 * Account number detail component. Shows full account
 * number and routing number.
 */
export const accountNumberDetailComponent = {
  template,
  bindings: {
    routingInfo: '<'
  }
};
