import angular from 'angular';
import { backButtonDirective } from './back-button.directive';
import { onEscapeDirective } from './on-escape.directive';

export const directives = angular.module('cfi.shared.directives', [])
  .directive('backButton', backButtonDirective)
  .directive('onEscape', onEscapeDirective);
