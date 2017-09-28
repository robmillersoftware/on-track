import angular from 'angular';
import { activityWidgetComponent } from './activity-widget.component';

export const activityWidget = angular.module('cfi.components.activityWidget',
  [])
  .component('activityWidget', activityWidgetComponent);
