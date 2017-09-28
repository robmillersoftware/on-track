import angular from 'angular';
import { dailyTrackerComponent } from './daily-tracker.component';

export const dailyTracker = angular.module('cfi.components.daily-tracker', [])
  .component('dailyTracker', dailyTrackerComponent);
