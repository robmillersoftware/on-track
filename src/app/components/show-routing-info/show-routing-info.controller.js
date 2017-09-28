import * as actions from './show-routing-info.actions.js';

/**
 * Controller for show-routing-info component.
 */
export default class ShowRoutingInfoController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} $ngRedux The application store.
   * @param {Object} state The `uiRouter` $state service.
   */
  constructor($ngRedux, $state) {
    'ngInject';
    this.store = $ngRedux;
    this.$state = $state;
  }

  /**
   * Binds actions to controller instance.
   */
  $onInit() {
    // Connects our `mapStateToThis` to redux and binds the actions
    // to our component `$ctrl`.
    this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Maps the `routingInfo` and `isPasswordVerified` widget object
   * to our component - `$ctrl`.
   * @param {object} state The state graph managed by redux.
   */
  mapStateToThis(state) {
    const { routingInfo } = state.routingInfo || {};
    const { isPasswordVerified } = state.routingInfo;
    return {
      routingInfo,
      isPasswordVerified
    };
  }
}
