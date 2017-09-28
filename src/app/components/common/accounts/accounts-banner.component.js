import template from './accounts-banner.html';
import controller from './accounts-banner.controller';

/**
 * Accounts banner container component. Contains the account selector
 * menu and account balance.
 */
export const accountsBannerComponent = {
  template,
  controller,
  bindings: {
    onSelectChange: '&?'
  }
};
