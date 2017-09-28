import angular from 'angular';
import { spendAnalysisToolsComponent } from './spend-analysis-tools.component';

export const spendAnalysisTools =
  angular.module('cfi.components.spendAnalysisTools', [])
.component('spendAnalysisTools', spendAnalysisToolsComponent);
