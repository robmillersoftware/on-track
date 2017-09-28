import angular from 'angular';
import { trendComponent } from './trend.component';
import { TrendActions } from './actions.service';
import { trendWidget } from './trend-widget/trend-widget';

export const trend = angular.module('cfi.components.trend', [
  trendWidget.name
])
.component('trend', trendComponent)
.service('TrendActions', TrendActions);
