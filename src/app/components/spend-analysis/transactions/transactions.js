import angular from 'angular';
import { transactionsComponent } from './transactions.component';
import {
  spendAnalysisTools
} from './spend-analysis-tools/spend-analysis-tools';

export const transactions = angular.module('cfi.spendanalysis.transactions', [
  spendAnalysisTools.name
])
.component('transactions', transactionsComponent);
