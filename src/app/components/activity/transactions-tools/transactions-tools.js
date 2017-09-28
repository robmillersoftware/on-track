import angular from 'angular';
import { transactionsToolsComponent } from './transactions-tools.component';

export const transactionsTools =
  angular.module('cfi.components.transactions-tools', [])
.component('transactionsTools', transactionsToolsComponent);
