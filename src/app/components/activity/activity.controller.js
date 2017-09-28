/**
 * Activity container. Controls the activity component which
 * contains transactions table.
 */
export default class ActivityController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} ngRedux The `ngRedux` state container service.
   * @param {Object} ActivityActions The redux actions for working with
   * account transactions
   */
  constructor($ngRedux, ActivityActions) {
    'ngInject';
    this.store = $ngRedux;
    this.actions = ActivityActions;

    this.subnav = [
      { label: 'Transactions', id: 'transactions' },
      { label: 'Statements', id: 'statements' },
      { label: 'Additional Info', id: 'info' },
      { label: 'Alerts & Preferences', id: 'prefs' }
    ];
  }

  /**
   * Binds actions to controller instance.
   */
  $onInit() {
    const actions = Object.assign({}, this.actions);
    this.currentTab = 'transactions';
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  /**
   * $postLink Function - Called when DOM is ready and we know the activity
   * actions will return an instance
   *
   * @returns {undefined} No [Explicit] Return
   */
  $postLink() {
    this.fetchActivity();
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Maps the 'activity` object to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { activity } = state;
    return {
      activity
    };
  }
}
