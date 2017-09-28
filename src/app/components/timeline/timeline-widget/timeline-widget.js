import angular from 'angular';
import { timelineWidgetComponent } from './timeline-widget.component';

export const timelineWidget = angular.module('cfi.components.timelineWidget',
  [])
  .component('timelineWidget', timelineWidgetComponent);
