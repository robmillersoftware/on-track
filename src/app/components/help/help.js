import angular from 'angular';
import { helpComponent } from './help.component';

export const help = angular.module('cfi.components.help', [])
  .component('help', helpComponent);
