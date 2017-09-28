import * as actions from './app.actions';

/**
 * Controller for root container component of application.
 */
export default class AppController {
  /**
   * Binds injected dependencies to instance.
   * @param {Object} state The `uiRouter` $state service.
   * @param {Object} location Angular wrapper service to location API.
   */
  constructor($state, $location, $ngRedux, pageErrorService) {
    'ngInject';
    this.$state = $state;
    this.$location = $location;
    this.store = $ngRedux;
    this.error = pageErrorService;
  }

  /**
   * Gets initial account id from referrer.
   */
  $onInit() {
    this.unsubscribe = this.store.connect(null, actions)(this);

    // Expect initial account id to be present in URL?
    // TODO: pull from sessionStorage if OLB can provide;
    // we may need JWT as well.
    this.initialAccountId = this.$location.search().aid;

    if (!this.initialAccountId) {
      // TODO: restore when mechanism for recieveving initial id exists
      // this.error.go(this.error.errorDetails.couldNotLoadDashboard);

      // Just set a fake account id for now
      // TODO: deprecate this
      this.initialAccountId = 'bf6253b2caf612257ed34d19ad4248a1c1152223741eb' +
        'be837e5e0cfc87d10d56d1ffd61004975d0437e1ce59a4a6e79,DDA,070';
    }

    this.setInitialAccountId(this.initialAccountId);
  }

  /**
   * Unsubscribes redux store.
   */
  $onDestroy() {
    this.unsubscribe();
  }

  /**
   * Handles the wbb-sidenav links, which generally refer back to the
   * OLB application.
   * @param {string} state The key of the requested state.
   * @param {Object} [params] Any additional data associated with state
   *  change request.
   */
  navigate(state, params) {
    // console.info('navigate: ', state, params);
    this.$state.go(state, params);
  }
}
