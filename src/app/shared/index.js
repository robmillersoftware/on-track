import angular from 'angular';
import { uiServices } from './ui-services';
import { directives } from './directives';

export const shared = angular.module('cfi.shared', [
  uiServices.name,
  directives.name
]);
