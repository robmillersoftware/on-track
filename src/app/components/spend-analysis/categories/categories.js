import angular from 'angular';
import { categoriesComponent } from './categories.component';

export const categories = angular
.module('cfi.spendanalysis.categories', [])
  .component('categories', categoriesComponent);
