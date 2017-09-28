import angular from 'angular';
import { accountSummaryComponent } from './account-summary.component';

export const accountSummary = angular.module('cfi.components.accountSummary', [
])
.component('accountSummary', accountSummaryComponent);
