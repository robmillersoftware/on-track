import angular from 'angular';
import { cashOutComponent } from './cash-out.component';

export const cashOut = angular.module('cfi.components.cash-out', [])
  .component('cashOut', cashOutComponent);
