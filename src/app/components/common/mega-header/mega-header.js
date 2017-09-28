import angular from 'angular';
import { megaHeaderComponent } from './mega-header.component';

export const megaHeader = angular.module(
  'cfi.components.mega-header', [])
  .component('megaHeader', megaHeaderComponent);
