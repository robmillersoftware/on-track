import controller from './show-routing-info.controller.js';
import template from './show-routing-info.html';

/**
 * Show routing info container component. Contains both verify-password
 * component and account-number detail component.
 */
export const showRoutingInfoComponent = {
  controller,
  template,
  bindings: {
    account: '<'
  }
};
