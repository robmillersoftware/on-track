import template from './accounts-menu.html';

/**
 * Accounts menu component. Contains list of accounts
 * and account balance. onSelect passes selected
 * account back to accounts banner to update
 * displayed account info.
 */
export const accountsMenuComponent = {
  template,
  bindings: {
    accounts: '<',
    selectedId: '<',
    onSelect: '&'
  }
};
