import angular from 'angular';
import { activityAdditionalInfoComponent } from
  './activity-additional-info.component';
import { AccountActions } from '../account.actions';

export const activityAdditionalInfo =
  angular.module('cfi.components.activity-additional-info', [])
    .service('AccountActions', AccountActions)
    .component('activityAdditionalInfo', activityAdditionalInfoComponent);
