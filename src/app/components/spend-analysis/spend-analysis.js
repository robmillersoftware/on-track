import angular from 'angular';
import { SpendAnalysisActions } from './actions.service';
import { spendingHistory } from './spending-history/spending-history';
import { spendingTotals } from './spending-totals/spending-totals';
import { transactions } from './transactions/transactions';
import {
  spendAnalysisTools
} from './transactions/spend-analysis-tools/spend-analysis-tools';
import { spendAnalysisComponent } from './spend-analysis.component';
import {
  spendAnalysisWidget
} from './spend-analysis-widget/spend-analysis-widget';

export const spendAnalysis = angular.module('cfi.components.spendAnalysis', [
  spendingHistory.name,
  spendingTotals.name,
  transactions.name,
  spendAnalysisTools.name,
  spendAnalysisWidget.name
])
.service('SpendAnalysisActions', SpendAnalysisActions)
.component('spendAnalysis', spendAnalysisComponent);
