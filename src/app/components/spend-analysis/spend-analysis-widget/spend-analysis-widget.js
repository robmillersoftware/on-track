import angular from 'angular';
import {
  spendAnalysisWidgetComponent
} from './spend-analysis-widget.component';

export const spendAnalysisWidget = angular
  .module('cfi.components.spendAnalysisWidget',
  [])
  .component('spendAnalysisWidget', spendAnalysisWidgetComponent);
