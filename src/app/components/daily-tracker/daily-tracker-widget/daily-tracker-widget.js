import angular from 'angular';
import { dailyTrackerWidgetComponent } from './daily-tracker-widget.component';

export const dailyTrackerWidget = angular
  .module('cfi.components.dailyTrackerWidget',
  [])
  .component('dailyTrackerWidget', dailyTrackerWidgetComponent);
