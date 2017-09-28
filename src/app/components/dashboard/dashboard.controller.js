/**
 * Responsible for top-level dashboard responsibilities such as reloading
 * the dashboard if the current account is changed.
 */
export default class DashboardController {
  /**
   * Binds injectables to instance.
   * @param {*} $state The `@uirouter/angularjs` state service.
   */
  constructor($ngRedux, $state) {
    'ngInject';
    this.$state = $state;
  }

  /**
   * Sets up the mega area message.
   */
  $onInit() {
    // TODO: use some sort of redux 'messages' state.
    this.message = 'Welcome back.';
  }

  /**
   * Forces a complete reload of the dashboard layout area, which includes
   * all of the widgets.
   */
  reloadDashboard() {
    const func = (this.$state.current.name !== 'dashboard.layout') ?
      'go' : 'reload';
    this.$state[func]('dashboard.layout');
  }
}
