import * as actions from '../dashboard.actions';

/**
 * Controls the dashboard cards layout, pinned card functionality, and
 * opening/closing of detail views.
 * Connects to dashboard state and uses dashboard actions / reducers.
 */
export default class LayoutController {
  /**
   * Binds injectables to instance.
   * @param {Object} ngRedux The `ngRedux` state container service.
   */
  constructor($ngRedux) {
    'ngInject';
    this.store = $ngRedux;
  }

  /**
   * Connects to redux, which binds actions to controller instance, and
   * sets up "offers" data source.
   */
  $onInit() {
    // Connects our `mapStateToThis` to redux and binds the actions
    // to our component `$ctrl`.
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);

    // TODO: offers should come from redux store, presumably
    this.offers = [1, 2, 3, 4];
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Maps the `pinned` widget object and `unpinned` widget list and
   * the current `account` activity graph to our component - `$ctrl`.
   * The `account` object contains the account summary information.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const dashboard = state.dashboard || {};
    const { detail } = dashboard;
    const { account } = state.activity || {};
    const { isHydrated } = state.accounts;
    return {
      detail,
      account,
      ready: isHydrated
    };
  }

  /**
   * Opens the details view for a dashboard widget.
   * @param {string} widget The key of the detail view to open.
   */
  openDetail(widget) {
    const detailTab = widget.replace(' ', '');
    // dispatch detail change tab action
    this.changeDetailTab(detailTab);
    // dispatch detail view show action
    this.showDetail();
  }

  /**
   *  Dispatches detail view hide action.
   */
  closeDetail() {
    this.hideDetail();
  }
}
