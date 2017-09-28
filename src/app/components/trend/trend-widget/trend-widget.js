import angular from 'angular';
import { trendWidgetComponent } from './trend-widget.component';

export const trendWidget = angular.module('cfi.components.trendWidget',
  [])
  .component('trendWidget', trendWidgetComponent);
