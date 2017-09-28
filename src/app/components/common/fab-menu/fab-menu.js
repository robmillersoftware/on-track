import angular from 'angular';
import { fabMenuComponent } from './fab-menu.component';

export const fabMenu = angular.module('cfi.components.common.fab-menu', [])
  .component('fabMenu', fabMenuComponent);
