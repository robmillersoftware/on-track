/**
 * Defined shared (mobile & desktop) uirouter states.
 * @param {Object} stateProvider The `@uirouter/angularjs` state provider
 *  on which to define states.
 */
export const sharedStates = ($stateProvider) => {
  $stateProvider
    .state('login', {
      onEnter: (olbRedirect) => {
        'ngInject';
        olbRedirect.toLogin();
        return false;
      }
    });
};
