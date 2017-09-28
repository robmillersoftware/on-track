import angular from 'angular';
// import { resizeProvider } from './resize.provider';
import ResizeService from './resize.service';
import { resizable } from './resize.directive';

export const resizeModule = angular.module('cfi.charts.common.resize', [])
  // .provider('resizeProvider', resizeProvider)
  .service('ResizeService', ResizeService)
  .directive('resizable', resizable);
