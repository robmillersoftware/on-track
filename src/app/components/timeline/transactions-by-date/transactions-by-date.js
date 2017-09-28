import angular from 'angular';
import { transactionsByDateComponent } from './transactions-by-date.component';

export const transactionsByDate =
  angular.module('cfi.components.timeline.transactions-by-date', [])
.component('transactionsByDate', transactionsByDateComponent);
