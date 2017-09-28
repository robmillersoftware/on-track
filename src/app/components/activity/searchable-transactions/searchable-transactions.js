import angular from 'angular';
import { searchableTransactionsComponent } from
  './searchable-transactions.component';

export const searchableTransactions =
  angular.module('cfi.components.searchable-transactions', [])
    .component('searchableTransactions', searchableTransactionsComponent);
