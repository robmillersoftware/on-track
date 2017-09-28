import { isPhone } from './uirouter/util';
import { defaultConfig } from './uirouter/default.states';
import { mobileConfig } from './uirouter/mobile.states';

/**
 * Configured all of the uirouter states for the application.
 * The routing for CFI resovles around the dashboard.
 * @param {Object} stateProvider @uirouter/angularjs $stateProvider service.
 * @param {Object} urlRouterProvider @uirouter/angularjs $urlRouterProvier.
 */
export const uiRouterConfig = isPhone() ? mobileConfig : defaultConfig;
