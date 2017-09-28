export default class SettingsController {
  constructor($ngRedux, $state, SettingsActions) {
    'ngInject';
    this.store = $ngRedux;
    this.$state = $state;
    this.actions = SettingsActions;
  }

  $onInit() {
    // Connects our `mapStateToThis` to redux and binds the actions
    // to our component `$ctrl`.
    const actions = Object.assign({}, this.actions);
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  $postLink() {
    this.fetchSettings()
      .then(() => this.setSfaAccount());
  }

  $onDestroy() {
    this.unsubscribe();
  }

  setSfaAccount() {
    this.sfaAccount = this.allAccounts.find(x =>
      x.id === this.sfaAccount
    );
  }

  /**
   * Maps the `pinned` widget object and `unpinned` widget list and
   * the current `account` activity graph to our component - `$ctrl`.
   * The `account` object contains the account summary information.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { sfaAccount, allAccounts } = state.settings || {};
    return {
      sfaAccount,
      allAccounts
    };
  }
}
