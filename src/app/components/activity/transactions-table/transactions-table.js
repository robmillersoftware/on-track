import angular from 'angular';
import { transactionsTableComponent } from './transactions-table.component';

export const transactionsTable =
  angular.module('cfi.components.transactions-table', [])
.component('transactionsTable', transactionsTableComponent);
