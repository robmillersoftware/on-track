import angular from 'angular';
import { showRoutingInfoComponent } from './show-routing-info.component.js';
import { verifyPassword } from './verify-password/verify-password';
import {
  accountNumberDetail
} from './account-number-detail/account-number-detail';

export const showRoutingInfo = angular
  .module('cfi.components.showRoutingInfo', [
    verifyPassword.name,
    accountNumberDetail.name
  ])
  .config($stateProvider => {
    'ngInject';
    $stateProvider.state('showRoutingInfo', {
      url: '/show-routing-info',
      component: 'showRoutingInfo'
    });
  })
  .component('showRoutingInfo', showRoutingInfoComponent);
