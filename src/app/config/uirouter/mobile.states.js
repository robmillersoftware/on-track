import { transitionToDetailMobile } from './util';
import { sharedStates } from './shared.states';

/**
 * Configures all of the uirouter states for the application when in
 * smartphone mode.
 * @param {Object} stateProvider @uirouter/angularjs $stateProvider service.
 * @param {Object} urlRouterProvider @uirouter/angularjs $urlRouterProvier.
 */
export const mobileConfig = ($stateProvider, $urlRouterProvider) => {
  'ngInject';
  $urlRouterProvider.otherwise('dashboard');

  // first apply the shared states
  sharedStates($stateProvider);

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      views: {
        '!$default': 'dashboard',
        '!$default.dashboard': 'layoutMobile'
      }
    })
    .state('dashboard.layout', {
      views: {
        '!$default.dashboard': 'layoutMobile'
      }
    })
    .state('help', {
      onEnter: transitionToDetailMobile('help')
    })
    .state('settings', {
      onEnter: transitionToDetailMobile('settings')
    });
};
