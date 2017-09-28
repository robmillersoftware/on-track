import angular from 'angular';
import { cashInComponent } from './cash-in.component';

export const cashIn = angular.module('cfi.components.cash-in', [])
  .component('cashIn', cashInComponent);
