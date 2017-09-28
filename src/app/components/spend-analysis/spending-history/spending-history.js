import angular from 'angular';
import { spendingHistoryComponent } from './spending-history.component';

export const spendingHistory = angular
.module('cfi.spendanalysis.spendinghistory', [])
  .component('spendingHistory', spendingHistoryComponent);
