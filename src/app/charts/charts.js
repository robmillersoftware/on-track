import angular from 'angular';
import { common } from './common';
import { cashflowChart } from './cashflow/cashflow-chart.component';
import { cashflowPreview } from './cashflow-preview/cashflow-preview.component';
import {
  spendAnalysisPreview
} from './spending-preview/spending-preview.component';
import { dailyTrackerPreview } from
  './daily-tracker-preview/daily-tracker-preview.component';
import { trendPreview } from './trend-preview/trend-preview.component';

export const charts = angular.module('cfi.charts', [
  common.name
])
.component('cashflowChart', cashflowChart)
.component('cashflowPreview', cashflowPreview)
.component('spendAnalysisPreview', spendAnalysisPreview)
.component('dailyTrackerPreview', dailyTrackerPreview)
.component('trendPreview', trendPreview);
