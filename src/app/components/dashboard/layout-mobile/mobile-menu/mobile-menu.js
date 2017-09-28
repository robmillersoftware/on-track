import angular from 'angular';
import { mobileMenuComponent } from './mobile-menu.component';

export const mobileMenu = angular.module('cfi.components.mobile-menu', [])
  .component('mobileMenu', mobileMenuComponent);
