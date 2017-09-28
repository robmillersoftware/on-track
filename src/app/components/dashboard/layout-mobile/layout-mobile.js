import angular from 'angular';
import { layoutMobileComponent } from './layout-mobile.component';
import { mobileMenu } from './mobile-menu/mobile-menu';
import { dailyTracker } from './daily-tracker/daily-tracker';
import { MobileActions } from './layout-mobile.actions';

export const layoutMobile = angular
  .module('cfi.components.dashboard.layout-mobile', [
    mobileMenu.name,
    dailyTracker.name
  ])
  .component('layoutMobile', layoutMobileComponent)
  .service('MobileActions', MobileActions);

