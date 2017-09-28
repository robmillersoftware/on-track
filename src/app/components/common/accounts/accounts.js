import angular from 'angular';
import { AccountsActions } from './accounts.actions';
import { accountsMenu } from './accounts-menu/accounts-menu';
import { accountsBannerComponent } from './accounts-banner.component';

export const accounts = angular.module('cfi.components.common.accounts', [
  accountsMenu.name
])
.service('AccountsActions', AccountsActions)
.component('accountsBanner', accountsBannerComponent);
