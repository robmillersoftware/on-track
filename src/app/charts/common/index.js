import angular from 'angular';
import { resizeModule } from './resize';
import { responsiveChart } from './responsive-chart.directive';
export { responsivefy } from './responsivefy';

export const common = angular.module('cfi.charts.common', [
  resizeModule.name
])
.directive('responsiveChart', responsiveChart);
