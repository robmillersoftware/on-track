import angular from 'angular';
import { DailyTrackerActions } from './daily-tracker.actions';
import { dailyTrackerComponent } from './daily-tracker.component';
import { dailyTrackerWidget } from
  './daily-tracker-widget/daily-tracker-widget';

export const dailyTracker = angular.module('cfi.components.dailyTracker', [
  dailyTrackerWidget.name
])
.service('DailyTrackerActions', DailyTrackerActions)
.component('dailyTracker', dailyTrackerComponent);
