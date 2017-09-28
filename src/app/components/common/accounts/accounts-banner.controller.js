import { isFunction } from 'angular';

/**
 * Accounts banner container. Controls the account picker.
 */
export default class AccountsBannerController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} ngRedux The `ngRedux` state container service.
   * @param {Object} AccountsActions The redux actions for working with CFI
   *  accounts state.
   */
  constructor($ngRedux, AccountsActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = AccountsActions;
  }

  /**
   * Connects container to redux store. Gets initial accountId from app state.
   * Initiates load of CFI accounts.
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.unsubscribe =
      this.store.connect(this.mapStateToThis.bind(this), actions)(this);

    // Load or reload CFI accounts
    if (this.app.isHydrated) {
      this.getAccounts();
    } else {
      this.getAccountsWithDefault(this.app.initialAccountId);
    }
  }

  /**
   * Unsubscribes from store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Dispatches action to change current account and invokes
   * `onAccountChange` optional binding if present.
   * @param {string} accountId The id of the new selected account.
   */
  changeAccount(accountId) {
    this.setCurrentById(accountId);
    if (isFunction(this.onSelectChange)) {
      this.onSelectChange({ accountId });
    }
  }

  /**
   * Maps list of CFI accounts and currently selected account from
   * redux state to container instance.
   * @param {Object} state The redux state graph.
   */
  mapStateToThis(state) {
    const { accounts, app } = state || {};
    const { isHydrated, initialAccountId } = app;
    return {
      accounts: accounts.all,
      current: accounts.current || {},
      app: {
        isHydrated,
        initialAccountId
      }
    };
  }
}
