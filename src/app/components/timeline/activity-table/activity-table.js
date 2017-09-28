import angular from 'angular';
import { activityTableComponent } from './activity-table.component';

export const activityTable =
  angular.module('cfi.components.timeline.activity-table', [])
.component('activityTable', activityTableComponent);
