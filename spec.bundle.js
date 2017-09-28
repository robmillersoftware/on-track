/**
 * This file contains setup necessary for our Karma + Webpack + ES2015 build.
 * The imports make sure that angular and angular-mocks are available to our
 * unit tests when Karma runs.
 */
import 'babel-polyfill';
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
// import ngRedux from 'ng-redux';
// import shared from './src/app/shared/shared';
// import components from './src/app/components/components';
// import { actions } from './src/app/state/actions';
import 'angular-mocks';

angular.module('icons', []);

// Register widely applicable mocks here
angular.module('mocks', [
  uiRouter,
  ngMessages,
  ngMaterial,
  // ngRedux,
  // shared.name,
  // actions.name,
  // components.name
])
.constant('remoteException', { report: angular.noop, attach: angular.noop });
