import angular from 'angular';
import { activityTable } from './activity-table/activity-table';
import { TimelineActions } from './timeline.actions';
import { timelineComponent } from './timeline.component';
import { timelineWidget } from './timeline-widget/timeline-widget';

export const timeline = angular.module('cfi.components.timeline', [
  activityTable.name,
  timelineWidget.name
])
.service('TimelineActions', TimelineActions)
.component('timeline', timelineComponent);
