import angular from 'angular';
import {
  accountNumberDetailComponent
} from './account-number-detail.component';

export const accountNumberDetail = angular
  .module('cfi.components.accountNumberDetail', [])
  .component('accountNumberDetail', accountNumberDetailComponent);
