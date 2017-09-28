import angular from 'angular';
import { detailViewAnimateDirective } from './detail-view-animate.directive';
import { detailViewComponent } from './detail-view.component';

export const detailView = angular.module('cfi.components.detail-view', [])
  .directive('detailViewAnimate', detailViewAnimateDirective)
  .component('detailView', detailViewComponent);
