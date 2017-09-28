/**
 * Contains methods for navigating to OLB locations.
 */
export default class olbRedirect {
  constructor($window) {
    'ngInject';
    this.$window = $window;
  }

  toLogin() {
    this.$window.location.href = '/#/login';
  }
}
