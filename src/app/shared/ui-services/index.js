import angular from 'angular';
import olbRedirect from './olb-redirect.service';

export const uiServices = angular.module('cfi.shared.ui-services', [])
  .service('olbRedirect', olbRedirect);
