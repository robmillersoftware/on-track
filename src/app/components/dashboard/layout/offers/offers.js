import angular from 'angular';
import { offersComponent } from './offers.component';

export const offers = angular.module('cfi.components.offers', [])
  .component('offers', offersComponent);
