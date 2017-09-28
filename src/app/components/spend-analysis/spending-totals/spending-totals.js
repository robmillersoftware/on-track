import angular from 'angular';
import { spendingTotalsComponent } from './spending-totals.component';

export const spendingTotals = angular
.module('cfi.spendanalysis.spendingtotals', [])
  .component('spendingTotals', spendingTotalsComponent);
