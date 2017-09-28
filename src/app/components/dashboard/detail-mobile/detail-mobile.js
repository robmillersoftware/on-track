import angular from 'angular';
import detailMobileService from './detail-mobile.service';
import { detailMobileComponent } from './detail-mobile.component';

export const detailMobile = angular.module('cfi.components.detail-mobile', [])
  .service('detailMobileService', detailMobileService)
  .component('detailMobile', detailMobileComponent);
