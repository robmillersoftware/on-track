import { transitionToDetail } from './util';
import { sharedStates } from './shared.states';

/**
 * Configures all of the uirouter states for the application when in
 * non-phone mode.
 * @param {Object} stateProvider @uirouter/angularjs $stateProvider service.
 * @param {Object} urlRouterProvider @uirouter/angularjs $urlRouterProvier.
 */
export const defaultConfig = ($stateProvider, $urlRouterProvider) => {
  'ngInject';
  $urlRouterProvider.otherwise('dashboard');

  // first apply the shared states
  sharedStates($stateProvider);

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      views: {
        '!$default': 'dashboard',
        '!$default.dashboard': 'layout'
      }
    })
    .state('dashboard.layout', {
      views: {
        '!$default.dashboard': 'layout'
      }
    })
    .state('dashboard.activity', {
      views: {
        detail: 'activity'
      }
    })
    .state('dashboard.dailytracker', {
      views: {
        detail: 'dailytracker'
      }
    })
    .state('dashboard.trend', {
      views: {
        detail: 'trend'
      }
    })
    .state('dashboard.timeline', {
      views: {
        detail: 'timeline'
      }
    })
    .state('dashboard.spendanalysis', {
      views: {
        detail: 'spendAnalysis'
      }
    })
    .state('dashboard.cashin', {
      views: {
        detail: 'cashIn'
      }
    })
    .state('dashboard.cashout', {
      views: {
        detail: 'cashOut'
      }
    })
    .state('dashboard.help', {
      views: {
        detail: 'help'
      }
    })
    .state('dashboard.settings', {
      views: {
        detail: 'settings'
      }
    })
    .state('help', {
      onEnter: transitionToDetail
    })
    .state('settings', {
      onEnter: transitionToDetail
    });
};
